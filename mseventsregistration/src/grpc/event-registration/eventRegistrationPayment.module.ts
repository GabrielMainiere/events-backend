import { Module } from "@nestjs/common";
import { EventsRegistrationRepository } from "./eventsRegistration.repository";
import { EventsRegistrationService } from "./eventsRegistration.service";
import { RegistrationRepository } from "src/registrations/repositories/registration.repository";
import { EventRegistrationPaymentsGrpcController } from "./eventRegistrationPayment.controller";
import { EventNotificationModule } from "src/producer/notifications/event-notification/event-notification.module";

@Module({
  imports: [EventNotificationModule],
  controllers: [EventRegistrationPaymentsGrpcController],
  providers: [
    EventsRegistrationService,
    EventsRegistrationRepository,
    {
      provide: 'IRegistrationRepository',
      useClass: RegistrationRepository,
    },
  ],
})
export class EventRegistrationPaymentsModule {}
