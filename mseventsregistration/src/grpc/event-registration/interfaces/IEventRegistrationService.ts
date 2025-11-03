import { IEventNotificationRequest } from "./IEventRegistrationRequest";
import { IEventNotificationResponse } from "./IEventRegistrationResponse";

export interface IEventRegistrationService {
  notifyEventCreated(data: IEventNotificationRequest): Promise<IEventNotificationResponse>;
  notifyEventUpdated(data: IEventNotificationRequest): Promise<IEventNotificationResponse>;
  notifyEventCancelled(data: IEventNotificationRequest): Promise<IEventNotificationResponse>;
}