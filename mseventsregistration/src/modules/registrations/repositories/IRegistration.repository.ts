import {
  RegistrationStatus,
  tb_registered_event,
  tb_user
} from '@prisma/client';
import { Registration } from '../entities/registration.entity';
import { EventRegistrationCompleteResponse } from '../dto/event-registration-complete.response';

export interface IRegistrationRepository {
  createRegistration(data: {
    userId: string;
    eventId: string;
    status: string;
  }): Promise<Registration>;

  findByUserAndEvent(
    userId: string,
    eventId: string
  ): Promise<Registration | null>;

  countByEvent(
    eventId: string,
    statuses: RegistrationStatus[]
  ): Promise<number>;

  findEventById(eventId: string): Promise<tb_registered_event | null>;

  findRegistrationById(registrationId: string): Promise<Registration | null>;

  updateRegistrationStatus(
    registrationId: string,
    status: string
  ): Promise<Registration>;

  findRegistrationsByEventId(
    eventId: string
  ): Promise<EventRegistrationCompleteResponse[]>;

  findAllConfirmedUsersByEvent(
    eventId: string
  ): Promise<{ event: tb_registered_event; users: tb_user[] }>;
}
