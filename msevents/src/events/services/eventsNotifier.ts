import { Injectable } from '@nestjs/common';
import { EventProducer } from 'src/producer/eventProducer';
import { IEventNotifier } from './IEventNotifier';
import { EventWithAddress } from '../repositories/events.repository';
import { EventsNotificationMapper } from '../mappers/eventsNotificationMapper';

@Injectable()
export class EventNotifier implements IEventNotifier {
  constructor(private readonly producer: EventProducer) {}

  async notifyCreated(event: EventWithAddress): Promise<void> {
    await this.producer.publishCreated(
      EventsNotificationMapper.toNotification(event)
    );
  }

  async notifyUpdated(event: EventWithAddress): Promise<void> {
    await this.producer.publishUpdated(
      EventsNotificationMapper.toNotification(event)
    );
  }

  async notifyCancelled(event: EventWithAddress): Promise<void> {
    await this.producer.publishCanceled(
      EventsNotificationMapper.toNotification(event)
    );
  }
}
