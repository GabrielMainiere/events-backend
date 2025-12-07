import { EventChangeAction } from 'src/enum/event-change-action'
import { EventChangeRequest } from './event-change.request'
import { Type } from 'class-transformer'

export class EventMessageRequest {
  @Type(() => EventChangeRequest)
  event: EventChangeRequest
  action: EventChangeAction
}
