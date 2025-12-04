import { Injectable, Inject } from '@nestjs/common';
import { IRegistrationValidator } from './IRegistrationValidator';
import type { IRegistrationRepository } from 'src/modules/registrations/repositories/IRegistration.repository';
import { tb_registered_event } from '@prisma/client';

@Injectable()
export class UserRegisteredValidator implements IRegistrationValidator {
  constructor(
    @Inject('IRegistrationRepository')
    private readonly registrationRepo: IRegistrationRepository
  ) {}

  async validate(userId: string, event: tb_registered_event): Promise<void> {
    const existing = await this.registrationRepo.findByUserAndEvent(
      userId,
      event.id
    );
    if (existing) {
      throw new Error('User already registered to this event.');
    }
  }
}
