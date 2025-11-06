import { Injectable, Inject } from '@nestjs/common';
import type { IUsersClient } from 'src/grpc/users/interfaces/IUsersClient';
import { RegistrationStrategyService } from '../strategies/registrationStrategyService';
import { IRegistrationValidator } from './validators/IRegistrationValidator';
import { ICheckInValidator } from './validators/ICheckInValidator';
import { Registration } from '../entities/registration.entity';
import type { IRegistrationRepository } from '../repositories/IRegistration.repository';
import { NotificationsTemplateNames } from 'src/core/enums';
import { NotificationsClientService } from 'src/grpc/notifications/client/notifications.client.service';
import { tb_user, tb_registered_event } from '@prisma/client';

@Injectable()
export class RegistrationService {
  constructor(
    @Inject('IUsersClient') private readonly usersClient: IUsersClient,
    private readonly strategyService: RegistrationStrategyService,
    private readonly notificationsClientService: NotificationsClientService,
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

    await this.sendEventRegistrationNotification(user, event);
    
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

}
