import { Injectable, Inject } from '@nestjs/common';
import { IRegistrationValidator } from './IRegistrationValidator';
import { tb_registered_event } from '@prisma/client';
import type { IRegistrationRepository } from 'src/registrations/repositories/IRegistration.repository';

@Injectable()
export class ValidateCanceledEvent implements IRegistrationValidator {
  constructor(
    @Inject('IRegistrationRepository')
    private readonly registrationRepo: IRegistrationRepository,
  ) {}

    async validate(_userId: string, event: tb_registered_event): Promise<void> {
        const eventData = await this.registrationRepo.findEventById(event.id);
        if (!eventData) {
            throw new Error('Event not found');
        }

        if (eventData.status === 'CANCELED') {
            throw new Error('Cannot register user in a canceled event');
        }
    }
}
