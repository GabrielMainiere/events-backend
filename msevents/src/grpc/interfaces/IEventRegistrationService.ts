import { Observable } from "rxjs";
import { IEventNotificationRequest } from "./IEventRegistrationRequest";
import { IEventNotificationResponse } from "./IEventRegistrationResponse";

export interface IEventRegistrationService {
  notifyEventCreated(data: IEventNotificationRequest): Observable<IEventNotificationResponse>;
  notifyEventUpdated(data: IEventNotificationRequest): Observable<IEventNotificationResponse>;
  notifyEventCancelled(data: IEventNotificationRequest): Observable<IEventNotificationResponse>;
  countEventRegistrations(data: { eventId: string }): Observable<{ count: number }>;
}