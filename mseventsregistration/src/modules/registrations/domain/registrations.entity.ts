import { RegistrationStatusValueObject } from './value-objects/registration-status.vo'

export interface CreateEventRegistrationProps {
  id: string
  userId: string
  eventId: string
  status: RegistrationStatusValueObject
  createdAt: Date
  updatedAt: Date
}

export class EventRegistrationDomain {
  id: string
  userId: string
  eventId: string
  status: RegistrationStatusValueObject
  createdAt: Date
  updatedAt: Date

  private constructor(props: CreateEventRegistrationProps) {
    this.id = props.id
    this.userId = props.userId
    this.eventId = props.eventId
    this.status = props.status
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  static create(props: CreateEventRegistrationProps): EventRegistrationDomain {
    return new EventRegistrationDomain(props)
  }
}
