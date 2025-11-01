import { Injectable, Inject } from '@nestjs/common';
import { IRegistrationStrategy } from './IRegistrationStrategy';
import { tb_registered_event } from 'generated/prisma';
import { Registration } from '../entities/registration.entity';
import type { IRegistrationRepository } from '../repositories/IRegistration.repository';
import { RegistrationStatus } from 'generated/prisma';

@Injectable()
export class PaidRegistrationStrategy implements IRegistrationStrategy {
  constructor(
    @Inject('IRegistrationRepository') private readonly registrationRepo: IRegistrationRepository,) {}

  async execute(userId: string, event: tb_registered_event): Promise<Registration> {
    const created = await this.registrationRepo.create({
        userId,
        eventId: event.id,
        status: RegistrationStatus.WAITING_PAYMENT,
    });
    return created;
  }
}
