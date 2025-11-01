import { Module } from '@nestjs/common';
import { EventRegistrationModule } from './event-registration/eventsRegistration.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EventRegistrationModule, UsersModule],
  exports: [UsersModule],
})
export class GrpcModule {}
