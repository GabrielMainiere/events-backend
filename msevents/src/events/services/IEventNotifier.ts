import { EventWithAddress } from "../repositories/events.repository";

export interface IEventNotifier {
  notifyCreatedOrUpdated(event: EventWithAddress): Promise<void>;
  notifyCancelled(event: EventWithAddress): Promise<void>;
}
