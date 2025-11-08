import { Injectable, Inject } from '@nestjs/common';
import type { IUsersClient } from 'src/grpc/users/interfaces/IUsersClient';
import { RegistrationStrategyService } from '../strategies/registrationStrategyService';
import { IRegistrationValidator } from './validators/IRegistrationValidator';
import { ICheckInValidator } from './validators/ICheckInValidator';
import { Registration } from '../entities/registration.entity';
import type { IRegistrationRepository } from '../repositories/IRegistration.repository';
import { EventWithUsers } from '../entities/eventWithUsers.entity';
import { EventMapper } from 'src/mappers/eventMapper';
import { NotificationsTemplateNames } from 'src/enum/notificationTemplateEnum';
import { NotificationsClientService } from 'src/grpc/notifications/client/notifications.client.service';
import { tb_user, tb_registered_event, RegistrationStatus } from '@prisma/client';
import { QRCodeGenerator } from 'src/utils/qrCodeGenerator';
import { QRCode } from '../entities/qrCode.entity';
import { tb_user, tb_registered_event } from '@prisma/client';
import { RegistrationStatus } from "@prisma/client";
import { EventNotificationService } from 'src/grpc/notifications/event-notification.service';

@Injectable()
export class RegistrationService {
  constructor(
    @Inject('IUsersClient') private readonly usersClient: IUsersClient,
    private readonly strategyService: RegistrationStrategyService,
    private readonly eventNotificationService: EventNotificationService,
    @Inject('IRegistrationValidators') private readonly validators: IRegistrationValidator[],
    @Inject('ICheckInValidators') private readonly checkInValidators: ICheckInValidator[],
    @Inject('IRegistrationRepository') private readonly registrationRepo: IRegistrationRepository,
  ) {}

  async registerUser(userId: string, eventId: string): Promise<Registration> {
    let user;

    try {
      user = await this.usersClient.findOne(userId);
    } catch (err) {
      throw new Error(`Error fetching user from msusers: ${(err as Error).message}`);
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
      updatedAt: new Date(),
    });

    const event = await this.registrationRepo.findEventById(eventId);
    if (!event) throw new Error('Event not found');

    for (const validator of this.validators) {
      await validator.validate(userId, event);
    }

    const registration = await this.strategyService.execute(userId, event);

    if (registration.status === RegistrationStatus.CONFIRMED) {
      await this.eventNotificationService.sendEventRegistrationNotification(user, event);
    } else if (registration.status === RegistrationStatus.WAITING_PAYMENT) {
      await this.eventNotificationService.sendWaitingPaymentNotification(user, event);
    }

    return registration;
  }

  async checkInUser(userId: string, eventId: string): Promise<Registration> {
    const registration = await this.registrationRepo.findByUserAndEvent(userId, eventId);
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

    return this.registrationRepo.updateRegistrationStatus(registration.id, 'CHECKED_IN');
  }
  
  async getAllUsersByEvent(eventId: string): Promise<EventWithUsers> {
    const { event, users } = await this.registrationRepo.findAllConfirmedUsersByEvent(eventId);
    return EventMapper.toGraphQL(event, users);
  }
 
  private async sendEventRegistrationNotification(user: tb_user, event: tb_registered_event) {
    try {
      await this.notificationsClientService.sendEventRegistrationNotification({
        userId: user.id,
        recipientAddress: user.email,
        eventId: event.id,
        payloadJson: JSON.stringify({
          name: user.name,
          eventName: event.title,
          eventDate: `${event.start_at.toLocaleString('pt-BR')} - ${event.end_at.toLocaleString('pt-BR')}`,
          eventLocation: `${event.address_country}, ${event.address_state} - ${event.address_city}, ${event.address_street} ${event.address_number || 'S/N'} - ${event.address_zipcode}`,
        }),
        templateName: NotificationsTemplateNames.EVENT_REGISTRATION_EMAIL,
      });
    } catch (error) {
      console.error('Failed to send event registration notification:', error);
    }
  }


  async generateCheckInQRCode(userId: string, eventId: string): Promise<QRCode> {
    const registration = await this.registrationRepo.findByUserAndEvent(userId, eventId);
    if (!registration || registration.status !== RegistrationStatus.CONFIRMED) {
      throw new Error('This user does not have a confirmed registration for this event.');
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
      throw new Error('The QRcode can only be generated 3 hours before the start of the event.');
    }

    if (diffHours < 0) {
      throw new Error('The event has already started or ended. QRcode can no longer be generated.');
    }

    const qrData = JSON.stringify({ userId, eventId });
    const base64 = await QRCodeGenerator.generateBase64(qrData);

    return {
      base64,
      expiresAt: event.end_at,
    };
  }
}
  }  
}
