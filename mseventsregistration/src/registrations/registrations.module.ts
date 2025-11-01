import { Module } from '@nestjs/common';
import { RegistrationResolver } from './registrations.resolver';
import { RegistrationRepository } from './repositories/registration.repository';
import { EventCapacityValidator } from './services/validators/validateCapacity';
import { UserRegisteredValidator } from './services/validators/userRegisteredValidation';
import { IRegistrationValidator } from './services/validators/IRegistrationValidator';
import { RegistrationStrategyService } from './strategies/registrationStrategyService';
import { FreeRegistrationStrategy } from './strategies/freeRegistrationStrategy';
import { PaidRegistrationStrategy } from './strategies/paidRegistrationStrategy';
import { GrpcModule } from 'src/grpc/grpc.module';
import { UsersClient } from 'src/grpc/users/client/userClient';
import { RegistrationService } from './services/registrations.service';

@Module({
  imports: [GrpcModule],
  providers: [

    RegistrationResolver,
    RegistrationService,

    {
      provide: 'IRegistrationRepository',
      useClass: RegistrationRepository,
    },
    RegistrationRepository,

    EventCapacityValidator,
    UserRegisteredValidator,
    {
      provide: 'IRegistrationValidators',
      useFactory: (capacity: EventCapacityValidator, already: UserRegisteredValidator): IRegistrationValidator[] => [
        capacity,
        already,
      ],
      inject: [EventCapacityValidator, UserRegisteredValidator],
    },
    FreeRegistrationStrategy,
    PaidRegistrationStrategy,
    RegistrationStrategyService,
    {
      provide: 'IUsersClient',
      useExisting: UsersClient,
    },
  ],
  exports: [
    RegistrationService,
  ],
})
export class RegistrationsModule {}
