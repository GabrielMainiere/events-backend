import { EventWithAddress } from "../../../infrastructure/adapters/database/events.repository.adapter";

export interface IEventNotifier {
  notifyCreatedOrUpdated(event: EventWithAddress): Promise<void>;
  notifyCancelled(event: EventWithAddress): Promise<void>;
}
