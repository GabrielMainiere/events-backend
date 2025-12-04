import { Injectable, Inject } from '@nestjs/common';
import type { IUsersClient } from 'src/grpc/users/interfaces/IUsersClient';
import { RegistrationStrategyService } from '../strategies/registrationStrategyService';
import { IRegistrationValidator } from './validators/IRegistrationValidator';
import { ICheckInValidator } from './validators/ICheckInValidator';
import { Registration } from '../entities/registration.entity';
import type { IRegistrationRepository } from '../repositories/IRegistration.repository';
import { EventWithUsers } from '../entities/eventWithUsers.entity';
import { EventMapper } from 'src/mappers/eventMapper';
import { QRCodeGenerator } from 'src/utils/qrCodeGenerator';
import { QRCode } from '../entities/qrCode.entity';
import { RegistrationStatus, tb_registered_event } from '@prisma/client';
import { EventNotificationService } from 'src/producer/notifications/event-notification/event-notification.service';
import { IPaymentUpdateRequest } from 'src/grpc/event-registration/interfaces/IPaymentUpdateRequest';
import { IPaymentUpdateResponse } from 'src/grpc/event-registration/interfaces/IPaymentUpdateResponse';
import { PaymentStatusMapper } from 'src/mappers/paymentStatusMapper';

@Injectable()
export class RegistrationService {
  constructor(
    @Inject('IUsersClient') private readonly usersClient: IUsersClient,
    private readonly strategyService: RegistrationStrategyService,
    private readonly eventNotificationService: EventNotificationService,
    @Inject('IRegistrationValidators')
    private readonly validators: IRegistrationValidator[],
    @Inject('ICheckInValidators')
    private readonly checkInValidators: ICheckInValidator[],
    @Inject('IRegistrationRepository')
    private readonly registrationRepo: IRegistrationRepository
  ) {}

  async registerUser(userId: string, eventId: string): Promise<Registration> {
    let user;

    try {
      user = await this.usersClient.findOne(userId);
    } catch (err) {
      throw new Error(
        `Error fetching user from msusers: ${(err as Error).message}`
      );
    }

    if (!user) {
      throw new Error('User not found');
    }

    await this.registrationRepo.createUser({
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      birthDate: user.birthDate,
      phone: user.phone,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const event = await this.registrationRepo.findEventById(eventId);
    if (!event) throw new Error('Event not found');

    for (const validator of this.validators) {
      await validator.validate(userId, event);
    }

    const registration = await this.strategyService.execute(userId, event);

    if (registration.status === RegistrationStatus.CONFIRMED) {
      await this.eventNotificationService.sendEventRegistrationNotification(
        user,
        event
      );
    } else if (registration.status === RegistrationStatus.WAITING_PAYMENT) {
      await this.eventNotificationService.sendWaitingPaymentNotification(
        user,
        event
      );
    }

    return registration;
  }

  async checkInUser(userId: string, eventId: string): Promise<Registration> {
    const registration = await this.registrationRepo.findByUserAndEvent(
      userId,
      eventId
    );
    if (!registration) {
      throw new Error('Registration not found for this user and event');
    }

    const event = await this.registrationRepo.findEventById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    for (const validator of this.checkInValidators) {
      await validator.validate(registration, event);
    }

    const user = await this.registrationRepo.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    await this.eventNotificationService.sendEventCheckInNotification(
      user,
      event
    );
    return this.registrationRepo.updateRegistrationStatus(
      registration.id,
      'CHECKED_IN'
    );
  }

  async getAllUsersByEvent(eventId: string): Promise<EventWithUsers> {
    const { event, users } =
      await this.registrationRepo.findAllConfirmedUsersByEvent(eventId);
    return EventMapper.toGraphQL(event, users);
  }

  async generateCheckInQRCode(
    userId: string,
    eventId: string
  ): Promise<QRCode> {
    const registration = await this.registrationRepo.findByUserAndEvent(
      userId,
      eventId
    );
    if (!registration || registration.status !== RegistrationStatus.CONFIRMED) {
      throw new Error(
        'This user does not have a confirmed registration for this event.'
      );
    }

    const event = await this.registrationRepo.findEventById(eventId);
    if (!event) throw new Error('Event not found');

    const eventStartLocal = new Date(
      event.start_at.getFullYear(),
      event.start_at.getMonth(),
      event.start_at.getDate(),
      event.start_at.getHours(),
      event.start_at.getMinutes(),
      event.start_at.getSeconds()
    );

    const nowLocal = new Date();

    const diffMs = eventStartLocal.getTime() - nowLocal.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours > 3) {
      throw new Error(
        'The QRcode can only be generated 3 hours before the start of the event.'
      );
    }

    if (diffHours < 0) {
      throw new Error(
        'The event has already started or ended. QRcode can no longer be generated.'
      );
    }

    const qrData = JSON.stringify({ userId, eventId });
    const base64 = await QRCodeGenerator.generateBase64(qrData);

    return {
      base64,
      expiresAt: event.end_at
    };
  }

  async receivePaymentUpdate(
    data: IPaymentUpdateRequest
  ): Promise<IPaymentUpdateResponse> {
    const { eventId, userId, status } = data;

    const registration = await this.registrationRepo.findByUserAndEvent(
      userId,
      eventId
    );
    if (!registration) {
      return { success: false, message: 'Registration not found' };
    }

    if (registration.status !== RegistrationStatus.WAITING_PAYMENT) {
      return {
        success: false,
        message: 'Registration not in WAITING_PAYMENT status'
      };
    }

    const paymentStatus = PaymentStatusMapper.map(status);
    const newStatus =
      paymentStatus === 'ACCEPTED'
        ? RegistrationStatus.CONFIRMED
        : RegistrationStatus.CANCELED;

    await this.registrationRepo.updateRegistrationStatus(
      registration.id,
      newStatus
    );

    if (newStatus === RegistrationStatus.CONFIRMED) {
      const user = await this.registrationRepo.findUserById(userId);
      const event = await this.registrationRepo.findEventById(eventId);

      if (user && event) {
        await this.eventNotificationService.sendEventRegistrationNotification(
          user,
          event
        );
      }
    }

    return {
      success: true,
      message: `Payment ${paymentStatus === 'ACCEPTED' ? 'accepted' : 'rejected'}, registration updated to ${newStatus}`
    };
  }

  async notifyUsersAboutCancellation(
    event: tb_registered_event
  ): Promise<void> {
    const registrations =
      await this.registrationRepo.findRegistrationsByEventId(event.id);

    for (const registration of registrations) {
      const user = registration.user;
      await this.eventNotificationService.sendEventCancellationNotification(
        user,
        event
      );
    }
  }
}
