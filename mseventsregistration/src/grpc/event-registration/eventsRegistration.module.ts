import { Module } from '@nestjs/common';
import { EventRegistrationGrpcController } from './eventRegistration.controller';
import { EventsRegistrationService } from './eventsRegistration.service';
import { EventsRegistrationRepository } from './eventsRegistration.repository';
import { RegistrationRepository } from 'src/registrations/repositories/registration.repository';
import { EventNotificationModule } from 'src/producer/notifications/event-notification/event-notification.module';

@Module({
  imports: [EventNotificationModule],
  controllers: [EventRegistrationGrpcController],
  providers: [
    EventsRegistrationService,
    EventsRegistrationRepository,
    {
      provide: 'IRegistrationRepository',
      useClass: RegistrationRepository,
    },
  ],
})
export class EventRegistrationModule {}
