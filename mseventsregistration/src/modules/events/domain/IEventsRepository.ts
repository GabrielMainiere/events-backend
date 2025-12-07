import { EventChangeRequest } from '../application/dto/event-change.request'
import { EventDomain } from './event.entity'

export abstract class IEventsRepository {
  abstract upsert(data: EventChangeRequest): Promise<EventDomain>
}
