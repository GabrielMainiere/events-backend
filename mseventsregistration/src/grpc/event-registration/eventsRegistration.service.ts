import { IEventRegistrationService } from './interfaces/IEventRegistrationService';
import { EventsRegistrationRepository } from './eventsRegistration.repository';
import { Injectable } from '@nestjs/common';
import { IGetRegistrationRequest } from './interfaces/IGetRegistrationRequest';
import { IGetRegistrationResponse } from './interfaces/IGetRegistrationResponse';
import { RegistrationStatus } from '@prisma/client';
import { EventRegistrationMapper } from 'src/mappers/getRegistrationMapper';

@Injectable()
export class EventsRegistrationService implements IEventRegistrationService {
  constructor(private readonly repository: EventsRegistrationRepository) {}

  async countEventRegistrations(data: {
    eventId: string;
  }): Promise<{ count: number }> {
    const { eventId } = data;

    if (!eventId) throw new Error('eventId must be provided');

    const count = await this.repository.countRegistrations(eventId);
    return { count };
  }

  async getRegistration(
    data: IGetRegistrationRequest
  ): Promise<IGetRegistrationResponse> {
    const { userId, eventId } = data;

    if (!userId || !eventId) {
      throw new Error('userId and eventId must be provided');
    }

    const registration = await this.repository.findRegistration(
      eventId,
      userId
    );
    if (!registration) {
      throw new Error('Registration not found');
    }

    if (registration.status !== RegistrationStatus.WAITING_PAYMENT) {
      throw new Error('Registration is not in WAITING_PAYMENT status');
    }

    const event = await this.repository.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    const user = await this.repository.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const totalRegistrations = await this.repository.countRegistrations(
      event.id
    );
    const hasVacancy = totalRegistrations < event.capacity;

    return EventRegistrationMapper.toGetRegistrationResponse(
      event,
      user,
      hasVacancy
    );
  }
}
