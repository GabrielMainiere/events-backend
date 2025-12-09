import { Injectable } from '@nestjs/common';
import { EventProducer } from 'src/modules/events/infrastructure/adapters/messaging/eventProducer.adapter';
import { EventChangeAction } from 'src/core/enum/eventChangeAction';
import { IEventNotifier } from '../../../domain/ports/out/IEventNotifier';
import { EventWithAddress } from '../database/events.repository.adapter';
import { EventsNotificationMapper } from '../../../application/mappers/eventNotification.mapper';

@Injectable()
export class EventNotifier implements IEventNotifier{
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
