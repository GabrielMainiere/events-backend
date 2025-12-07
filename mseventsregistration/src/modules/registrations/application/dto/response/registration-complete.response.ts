import { EventMapper } from 'src/modules/events/application/mappers/event.mapper'
import { EventDomain } from 'src/modules/events/domain/event.entity'
import { RegistrationStatusValueObject } from 'src/modules/registrations/domain/value-objects/registration-status.vo'
import { PrismaRegistrationWithRelations } from 'src/modules/registrations/infraestructure/types/registration-complete.type'
import { UserMapper } from 'src/modules/users/application/mappers/user.mapper'
import { UserDomain } from 'src/modules/users/domain/user.entity'

export class EventRegistrationCompleteResponse {
  id: string
  userId: string
  eventId: string
  status: RegistrationStatusValueObject
  createdAt: Date
  updatedAt: Date

  user: UserDomain
  event: EventDomain

  private constructor(props: EventRegistrationCompleteResponse) {
    this.id = props.id
    this.userId = props.userId
    this.eventId = props.eventId
    this.status = props.status
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.user = props.user
    this.event = props.event
  }

  static fromPersistence(
    raw: PrismaRegistrationWithRelations
  ): EventRegistrationCompleteResponse {
    return new EventRegistrationCompleteResponse({
      id: raw.id,
      userId: raw.userId,
      eventId: raw.eventId,
      status: raw.status as RegistrationStatusValueObject,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      user: UserMapper.toDomain(raw.user),
      event: EventMapper.toDomain(raw.event)
    })
  }

  static fromPersistenceArray(
    raw: PrismaRegistrationWithRelations[]
  ): EventRegistrationCompleteResponse[] {
    return raw.map((data) =>
      EventRegistrationCompleteResponse.fromPersistence(data)
    )
  }
}
