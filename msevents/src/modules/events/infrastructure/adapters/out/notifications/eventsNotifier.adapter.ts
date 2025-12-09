import { Injectable } from '@nestjs/common';
import { EventProducer } from '../messaging/eventProducer.adapter';
import { EventChangeAction } from 'src/core/enum/eventChangeAction';
import { EventNotifierPort } from '../../../../domain/ports/out/eventNotifierr.port';
import { EventWithAddress } from '../database/events.repository.adapter';
import { EventsNotificationMapper } from '../../../../application/mappers/eventNotification.mapper';

@Injectable()
export class EventNotifier implements EventNotifierPort{
  constructor(private readonly producer: EventProducer) {}

  notifyCreatedOrUpdated(event: EventWithAddress): Promise<void> {
    const payload = EventsNotificationMapper.toNotification(event);
    return this.producer.publish(payload, EventChangeAction.UPSERT);
  }

  notifyCancelled(event: EventWithAddress): Promise<void> {
    const payload = EventsNotificationMapper.toNotification(event);
    return this.producer.publish(payload, EventChangeAction.CANCEL);
  }
}
