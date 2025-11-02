import { Module } from "@nestjs/common";
import { EventRegistrationPaymentsGrpcController } from "./eventRegistrationPayment.controller";
import { EventsRegistrationRepository } from "./eventsRegistration.repository";
import { EventsRegistrationService } from "./eventsRegistration.service";

@Module({
  controllers: [EventRegistrationPaymentsGrpcController],
  providers: [EventsRegistrationService, EventsRegistrationRepository],
})
export class EventRegistrationPaymentsModule {}
