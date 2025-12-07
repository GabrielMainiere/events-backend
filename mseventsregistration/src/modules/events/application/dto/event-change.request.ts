import { EmptyToUndefined } from 'src/core/transformers/empty-to-undefined'
import { EventStatusValueObject } from '../../domain/value-objects/event-status.vo'
import { EventTypeValueObject } from '../../domain/value-objects/event-type.vo'

export class EventChangeRequest {
  id: string
  title: string
  description?: string
  startAt: string
  endAt: string
  price?: number

  @EmptyToUndefined()
  saleStartAt?: string

  @EmptyToUndefined()
  saleEndAt?: string

  addressStreet: string
  addressNumber?: string
  addressCity: string
  addressState: string
  addressZipcode: string
  addressCountry: string
  capacity: number
  isFree: boolean
  eventType: EventTypeValueObject
  status: EventStatusValueObject
  createdAt: string
  updatedAt: string
}
