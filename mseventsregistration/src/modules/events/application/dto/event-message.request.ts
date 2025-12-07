import { EventChangeAction } from 'src/enum/event-change-action'
import { EventChangeRequest } from './event-change.request'

export class EventMessageRequest {
  event: EventChangeRequest
  action: EventChangeAction
}
