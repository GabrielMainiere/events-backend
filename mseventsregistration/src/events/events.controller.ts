import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EVENT_CHANGE_PATTERN } from 'src/core/constants';
import type { EventMessageInput } from './dto/event-message.input';
import { EVENTS_SERVICE } from './providers/service.provider';
import type { IEventsService } from './interfaces/IEventService';

@Controller()
export class EventsController {
  constructor(
    @Inject(EVENTS_SERVICE) private readonly eventsService: IEventsService
  ) {}

  @EventPattern(EVENT_CHANGE_PATTERN)
  async handleEventCancellation(@Payload() data: EventMessageInput) {
    await this.eventsService.handleEventChange(data.event, data.action);
  }
}
