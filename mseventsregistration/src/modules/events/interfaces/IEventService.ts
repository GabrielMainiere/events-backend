import { EventChangeAction } from 'src/enum/event-change-action';
import { EventChangeInput } from '../dto/event-change.input';

export interface IEventsService {
  handleEventChange(
    data: EventChangeInput,
    action: EventChangeAction
  ): Promise<void>;
}
