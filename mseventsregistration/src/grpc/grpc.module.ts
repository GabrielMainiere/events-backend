import { Module } from '@nestjs/common';
import { EventRegistrationModule } from './event-registration/eventsRegistration.module';

@Module({
  imports: [EventRegistrationModule],
})
export class GrpcModule {}
