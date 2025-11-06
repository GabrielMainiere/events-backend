import { Module } from '@nestjs/common';
import { EventRegistrationModule } from './event-registration/eventsRegistration.module';
import { UsersModule } from './users/users.module';
import { EventRegistrationPaymentsModule } from './event-registration/eventRegistrationPayment.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [EventRegistrationModule, UsersModule, EventRegistrationPaymentsModule, NotificationsModule],
  exports: [UsersModule, NotificationsModule],
})
export class GrpcModule {}
