import { Event } from '../../entities/event.entity';

export interface EventNotifierPort {
  notifyCreatedOrUpdated(event: Event): Promise<void>;
  notifyCancelled(event: Event): Promise<void>;
}
