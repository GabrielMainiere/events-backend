import { EventWithAddress } from '../repositories/events.repository';

export interface IEventNotifier {
  notifyCreated(event: EventWithAddress): Promise<void>;
  notifyUpdated(event: EventWithAddress): Promise<void>;
  notifyCancelled(event: EventWithAddress): Promise<void>;
}
