import { EventChangeAction } from 'src/enum/event-change-action';
import { EventChangeInput } from '../dto/event-change.input';
import { tb_registered_event } from '@prisma/client';

export abstract class IEventsService {
  abstract handleEventChange(
    data: EventChangeInput,
    action: EventChangeAction
  ): Promise<void>;

  abstract getEventById(eventId: string): Promise<tb_registered_event | null>;
}
