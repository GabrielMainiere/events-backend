import { Module } from '@nestjs/common';
import { EventRegistrationGrpcController } from './eventRegistration.controller';
import { EventsRegistrationService } from './eventsRegistration.service';
import { EventsRegistrationRepository } from './eventsRegistration.repository';

@Module({
  controllers: [EventRegistrationGrpcController],
  providers: [EventsRegistrationService, EventsRegistrationRepository],
})
export class EventRegistrationModule {}
