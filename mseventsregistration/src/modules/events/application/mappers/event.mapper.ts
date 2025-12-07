import { Event } from '@prisma/client'
import { EventDomain } from '../../domain/event.entity'
import { EventStatusValueObject } from '../../domain/value-objects/event-status.vo'
import { EventTypeValueObject } from '../../domain/value-objects/event-type.vo'

export class EventMapper {
  static toDomain(raw: Event): EventDomain {
    return EventDomain.create({
      id: raw.id,
      title: raw.title,
      description: raw.description ?? undefined,
      startAt: raw.startAt,
      endAt: raw.endAt,
      addressCity: raw.addressCity,
      addressCountry: raw.addressCountry,
      addressNumber: raw.addressNumber ?? undefined,
      addressState: raw.addressState,
      addressStreet: raw.addressStreet,
      addressZipcode: raw.addressZipcode,
      capacity: raw.capacity,
      isFree: raw.isFree,
      status: raw.status as EventStatusValueObject,
      eventType: raw.eventType as EventTypeValueObject,
      price: raw.price ?? undefined,
      saleStartAt: raw.saleStartAt ?? undefined,
      saleEndAt: raw.saleEndAt ?? undefined,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    })
  }
}
