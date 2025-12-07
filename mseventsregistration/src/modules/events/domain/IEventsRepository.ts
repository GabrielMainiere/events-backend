import { EventChangeInput } from '../dto/event-change.input'
import { EventDomain } from './event.entity'

export abstract class IEventsRepository {
  abstract create(data: EventChangeInput): Promise<EventDomain>
  abstract update(data: EventChangeInput): Promise<EventDomain>
  abstract findById(id: string): Promise<EventDomain | null>
}
