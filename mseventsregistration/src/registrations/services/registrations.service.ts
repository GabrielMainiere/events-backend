import { Injectable, Inject } from '@nestjs/common';
import type { IUsersClient } from 'src/grpc/users/interfaces/IUsersClient';
import { RegistrationStrategyService } from '../strategies/registrationStrategyService';
import { IRegistrationValidator } from './validators/IRegistrationValidator';
import { Registration } from '../entities/registration.entity';
import type { IRegistrationRepository } from '../repositories/IRegistration.repository';

@Injectable()
export class RegistrationService {
  constructor(
    @Inject('IUsersClient') private readonly usersClient: IUsersClient,
    private readonly strategyService: RegistrationStrategyService,
    @Inject('IRegistrationValidators') private readonly validators: IRegistrationValidator[],
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

    const event = await this.registrationRepo.findEventById(eventId);
    if (!event) throw new Error('Event not found');

    for (const validator of this.validators) {
      await validator.validate(userId, event);
    }

    return this.strategyService.execute(userId, event);
  }
}
