import { EventWithAddress } from "../../../infrastructure/adapters/out/database/events.repository.adapter";

export interface IEventNotifier {
  notifyCreatedOrUpdated(event: EventWithAddress): Promise<void>;
  notifyCancelled(event: EventWithAddress): Promise<void>;
}
