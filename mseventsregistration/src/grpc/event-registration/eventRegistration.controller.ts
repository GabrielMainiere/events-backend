import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { EventsRegistrationService } from "./eventsRegistration.service";
import type { IEventNotificationRequest } from "./interfaces/IEventRegistrationRequest";
import type { IEventNotificationResponse } from "./interfaces/IEventRegistrationResponse";

@Controller()
export class EventRegistrationGrpcController {
  constructor(private readonly service: EventsRegistrationService) {}

  @GrpcMethod("EventRegistrationService", "NotifyEventCreated")
  async notifyEventCreated(data: IEventNotificationRequest): Promise<IEventNotificationResponse> {
    return this.service.notifyEventCreated(data);
  }

  @GrpcMethod("EventRegistrationService", "NotifyEventUpdated")
  async notifyEventUpdated(data: IEventNotificationRequest): Promise<IEventNotificationResponse> {
    return this.service.notifyEventUpdated(data);
  }

  @GrpcMethod("EventRegistrationService", "NotifyEventCancelled")
  async notifyEventCancelled(data: IEventNotificationRequest): Promise<IEventNotificationResponse> {
    return this.service.notifyEventCancelled(data);
  }
}
