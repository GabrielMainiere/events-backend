import { Module } from '@nestjs/common';
import { EventRegistrationModule } from './event-registration/eventsRegistration.module';
import { UsersModule } from '../modules/users/users.module';
import { EventRegistrationPaymentsModule } from './event-registration/eventRegistrationPayment.module';

@Module({
  imports: [
    EventRegistrationModule,
    UsersModule,
    EventRegistrationPaymentsModule
  ],
  exports: [UsersModule]
})
export class GrpcModule {}
