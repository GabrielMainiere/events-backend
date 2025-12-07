import { EventDomain } from 'src/modules/events/domain/event.entity'
import { UserDomain } from 'src/modules/users/domain/user.entity'

export class GetRegistrationResponse {
  id: string
  title: string
  description: string
  startAt: string
  endAt: string
  price: number
  saleStartAt: string
  saleEndAt: string
  addressStreet: string
  addressNumber: string
  addressCity: string
  addressState: string
  addressZipcode: string
  addressCountry: string
  capacity: number
  isFree: boolean
  eventType: string
  status: string
  createdAt: string
  updatedAt: string
  hasVacancy: boolean
  name: string
  email: string
  cpf: string

  private constructor(props: GetRegistrationResponse) {
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
    this.eventType = props.eventType
    this.status = props.status
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.hasVacancy = props.hasVacancy
    this.name = props.name
    this.email = props.email
    this.cpf = props.cpf
  }

  static create(
    event: EventDomain,
    user: UserDomain,
    hasVacancy: boolean
  ): GetRegistrationResponse {
    return new GetRegistrationResponse({
      id: event.id,
      title: event.title,
      description: event.description ?? '',
      startAt: event.startAt.toISOString(),
      endAt: event.endAt.toISOString(),
      price: event.price ?? 0,
      saleStartAt: event.saleStartAt?.toISOString() ?? '',
      saleEndAt: event.saleEndAt?.toISOString() ?? '',
      addressStreet: event.addressStreet,
      addressNumber: event.addressNumber ?? '',
      addressCity: event.addressCity,
      addressState: event.addressState,
      addressZipcode: event.addressZipcode,
      addressCountry: event.addressCountry,
      capacity: event.capacity,
      isFree: event.isFree,
      eventType: event.eventType,
      status: event.status,
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
      hasVacancy,
      name: user.name,
      email: user.email,
      cpf: user.cpf
    })
  }
}
