import { EventStatusValueObject } from './value-objects/event-status.vo'
import { EventTypeValueObject } from './value-objects/event-type.vo'

export class EventDomain {
  id: string
  title: string
  description?: string
  startAt: Date
  endAt: Date
  price?: number
  saleStartAt?: Date
  saleEndAt?: Date
  addressStreet: string
  addressNumber?: string
  addressCity: string
  addressState: string
  addressZipcode: string
  addressCountry: string
  capacity: number
  isFree: boolean
  status: EventStatusValueObject
  eventType: EventTypeValueObject
  createdAt: Date
  updatedAt: Date

  private constructor(props: EventDomain) {
    this.id = props.id
    this.title = props.title
    this.description = props.description
    this.startAt = props.startAt
    this.endAt = props.endAt
    this.price = props.price
    this.saleStartAt = props.saleStartAt
    this.saleEndAt = props.saleEndAt
    this.addressStreet = props.addressStreet
    this.addressNumber = props.addressNumber
    this.addressCity = props.addressCity
    this.addressState = props.addressState
    this.addressZipcode = props.addressZipcode
    this.addressCountry = props.addressCountry
    this.capacity = props.capacity
    this.isFree = props.isFree
    this.status = props.status
    this.eventType = props.eventType
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  static create(props: EventDomain): EventDomain {
    return new EventDomain(props)
  }
}
