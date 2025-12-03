import { EventChangeAction } from 'src/enum/event-change-action';
import { EventChangeInput } from './event-change.input';

export class EventMessageInput {
  event: EventChangeInput;
  action: EventChangeAction;
}
