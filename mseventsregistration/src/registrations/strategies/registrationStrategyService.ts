import { Injectable } from '@nestjs/common';
import { FreeRegistrationStrategy } from './freeRegistrationStrategy';
import { PaidRegistrationStrategy } from './paidRegistrationStrategy';
import { tb_registered_event } from '@prisma/client';
import { Registration } from '../entities/registration.entity';

@Injectable()
export class RegistrationStrategyService {
  constructor(
    private readonly freeStrategy: FreeRegistrationStrategy,
    private readonly paidStrategy: PaidRegistrationStrategy,
  ) {}

  async execute(userId: string, event: tb_registered_event): Promise<Registration> {
    if (event.is_free) {
      return this.freeStrategy.execute(userId, event);
    }
    return this.paidStrategy.execute(userId, event);
  }
}
