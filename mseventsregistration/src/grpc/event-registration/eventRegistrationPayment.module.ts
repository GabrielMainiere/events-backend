import { Module } from "@nestjs/common";
import { EventsRegistrationRepository } from "./eventsRegistration.repository";
import { EventsRegistrationService } from "./eventsRegistration.service";
import { RegistrationRepository } from "src/registrations/repositories/registration.repository";
import { EventNotificationModule } from "../notifications/event-notification.module";
import { EventRegistrationGrpcController } from "./eventRegistration.controller";

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
export class EventRegistrationPaymentsModule {}
