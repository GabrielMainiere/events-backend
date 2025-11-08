import { Module } from '@nestjs/common';
import { EventRegistrationGrpcController } from './eventRegistration.controller';
import { EventsRegistrationService } from './eventsRegistration.service';
import { EventsRegistrationRepository } from './eventsRegistration.repository';
import { EventNotificationModule } from '../notifications/event-notification.module';
import { RegistrationRepository } from 'src/registrations/repositories/registration.repository';

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
