import { Module } from "@nestjs/common";
import { EventsRegistrationRepository } from "./eventsRegistration.repository";
import { EventsRegistrationService } from "./eventsRegistration.service";
import { RegistrationRepository } from "src/registrations/repositories/registration.repository";
import { EventNotificationModule } from "../notifications/event-notification.module";
import { EventRegistrationPaymentsGrpcController } from "./eventRegistrationPayment.controller";

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
