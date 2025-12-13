import { Injectable } from '@nestjs/common';
import { EventProducer } from '../messaging/eventProducer.adapter';
import { EventChangeAction } from 'src/core/enum/eventChangeAction';
import { EventNotifierPort } from '../../../../domain/ports/out/eventNotifierr.port';
import { Event } from 'src/modules/events/domain/entities/event.entity';
import { EventsNotifierMapper } from '../../in/mappers/eventNotifier.mapper';

@Injectable()
export class EventNotifier implements EventNotifierPort{
  constructor(private readonly producer: EventProducer) {}

  notifyCreatedOrUpdated(event: Event): Promise<void> {
    const payload = EventsNotifierMapper.toNotification(event);
    return this.producer.publish(payload, EventChangeAction.UPSERT);
  }

  notifyCancelled(event: Event): Promise<void> {
    const payload = EventsNotifierMapper.toNotification(event);
    return this.producer.publish(payload, EventChangeAction.CANCEL);
  }
}
