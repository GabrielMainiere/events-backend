import { Injectable } from '@nestjs/common';
import {
  tb_registered_event,
  tb_events_registration,
  RegistrationStatus
} from '@prisma/client';
import { PrismaSingleton } from 'src/core/prismaSingleton';

@Injectable()
export class EventsRegistrationRepository {
  private prisma = PrismaSingleton.getInstance();

  async findById(id: string): Promise<tb_registered_event | null> {
    return this.prisma.tb_registered_event.findUnique({
      where: { id }
    });
  }

  async findUserById(id: string) {
    return this.prisma.tb_user.findUnique({
      where: { id }
    });
  }

  async countRegistrations(eventId: string): Promise<number> {
    return this.prisma.tb_events_registration.count({
      where: {
        registered_event_id: eventId,
        status: RegistrationStatus.CONFIRMED
      }
    });
  }

  async findRegistration(
    eventId: string,
    userId: string
  ): Promise<tb_events_registration | null> {
    return this.prisma.tb_events_registration.findFirst({
      where: {
        registered_event_id: eventId,
        user_id: userId
      }
    });
  }
}
