import { Injectable, Inject } from '@nestjs/common';
import { IRegistrationValidator } from './IRegistrationValidator';
import type { IRegistrationRepository } from 'src/modules/registrations/repositories/IRegistration.repository';
import { RegistrationStatus, tb_registered_event } from '@prisma/client';

@Injectable()
export class EventCapacityValidator implements IRegistrationValidator {
  constructor(
    @Inject('IRegistrationRepository')
    private readonly registrationRepo: IRegistrationRepository
  ) {}

  async validate(_userId: string, event: tb_registered_event): Promise<void> {
    const total = await this.registrationRepo.countByEvent(event.id, [
      RegistrationStatus.CONFIRMED,
      RegistrationStatus.WAITING_PAYMENT
    ]);
    if (total >= event.capacity) {
      throw new Error('The event has already reached maximum capacity.');
    }
  }
}
