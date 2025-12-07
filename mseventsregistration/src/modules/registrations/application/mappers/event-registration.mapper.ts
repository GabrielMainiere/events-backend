import { RegistrationStatus, EventsRegistration } from '@prisma/client'
import { RegistrationStatusValueObject } from '../../domain/value-objects/registration-status.vo'
import { EventRegistrationDomain } from '../../domain/registrations.entity'

export class RegistrationMapper {
  static toDomain(raw: EventsRegistration): EventRegistrationDomain {
    return EventRegistrationDomain.create({
      id: raw.id,
      userId: raw.userId,
      eventId: raw.eventId,
      status: raw.status as RegistrationStatusValueObject,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    })
  }

  static toPersistence(
    registration: EventRegistrationDomain
  ): EventsRegistration {
    return {
      id: registration.id,
      userId: registration.userId,
      eventId: registration.eventId,
      status: registration.status as RegistrationStatus,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

  static toDomainArray(raws: EventsRegistration[]): EventRegistrationDomain[] {
    return raws.map((raw) => this.toDomain(raw))
  }
}
