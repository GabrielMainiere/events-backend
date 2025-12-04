import { Module } from '@nestjs/common';
import { RegistrationResolver } from './registrations.resolver';
import { RegistrationRepository } from './repositories/registration.repository';
import { EventCapacityValidator } from './services/validators/validateCapacity';
import { UserRegisteredValidator } from './services/validators/userRegisteredValidation';
import { IRegistrationValidator } from './services/validators/IRegistrationValidator';
import { CheckInStatusValidator } from './services/validators/checkInStatusValidator';
import { CheckInDateValidator } from './services/validators/checkInDateValidator';
import { ICheckInValidator } from './services/validators/ICheckInValidator';
import { RegistrationStrategyService } from './strategies/registrationStrategyService';
import { FreeRegistrationStrategy } from './strategies/freeRegistrationStrategy';
import { PaidRegistrationStrategy } from './strategies/paidRegistrationStrategy';
import { GrpcModule } from 'src/grpc/grpc.module';
import { UsersClient } from 'src/modules/users/client/userClient';
import { RegistrationService } from './services/registrations.service';
import { ValidateCanceledEvent } from './services/validators/validateCanceledEvent';
import { RegistrationsController } from './registrations.controller';
import { EventNotificationModule } from 'src/modules/notifications/event-notification/event-notification.module';

@Module({
  imports: [GrpcModule, EventNotificationModule],
  providers: [
    RegistrationResolver,
    RegistrationService,

    {
      provide: 'IRegistrationRepository',
      useClass: RegistrationRepository
    },
    RegistrationRepository,

    EventCapacityValidator,
    UserRegisteredValidator,
    ValidateCanceledEvent,
    {
      provide: 'IRegistrationValidators',
      useFactory: (
        capacity: EventCapacityValidator,
        already: UserRegisteredValidator,
        canceled: ValidateCanceledEvent
      ): IRegistrationValidator[] => [capacity, already, canceled],
      inject: [
        EventCapacityValidator,
        UserRegisteredValidator,
        ValidateCanceledEvent
      ]
    },

    CheckInStatusValidator,
    CheckInDateValidator,
    {
      provide: 'ICheckInValidators',
      useFactory: (
        status: CheckInStatusValidator,
        date: CheckInDateValidator
      ): ICheckInValidator[] => [status, date],
      inject: [CheckInStatusValidator, CheckInDateValidator]
    },

    FreeRegistrationStrategy,
    PaidRegistrationStrategy,
    RegistrationStrategyService,
    {
      provide: 'IUsersClient',
      useExisting: UsersClient
    }
  ],
  exports: [RegistrationService],
  controllers: [RegistrationsController]
})
export class RegistrationsModule {}
