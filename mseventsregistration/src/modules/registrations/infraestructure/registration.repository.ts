import { Injectable } from '@nestjs/common'
import { PrismaSingleton } from 'src/core/prismaSingleton'
import { RegistrationStatus } from '@prisma/client'
import { IRegistrationRepository } from '../repositories/IRegistration.repository'
import { EventRegistrationDomain } from '../domain/registrations.entity'
import { RegistrationMapper } from '../application/mappers/event-registration.mapper'
import { RegistrationStatusValueObject } from '../domain/value-objects/registration-status.vo'
import { RegistrationStatusMapper } from '../application/mappers/registration-status.mapper'
import { EventRegistrationCompleteResponse } from '../application/dto/response/registration-complete.response'
import { EventWithUsersResponse } from '../application/dto/response/event-with-users.response.dto'
import { ListRegistrationsFilterRequest } from '../application/dto/request/list-registrations-filter-request'

@Injectable()
export class RegistrationRepository implements IRegistrationRepository {
  private prisma = PrismaSingleton.getInstance()

  async createRegistration(data: {
    userId: string
    eventId: string
    status: RegistrationStatusValueObject
  }): Promise<EventRegistrationCompleteResponse> {
    const result = await this.prisma.eventsRegistration.create({
      data: {
        userId: data.userId,
        eventId: data.eventId,
        status: RegistrationStatusMapper.toPersistence(data.status)
      },
      include: { event: true, user: true }
    })

    return EventRegistrationCompleteResponse.fromPersistence(result)
  }

  async findByUserAndEvent(
    userId: string,
    eventId: string
  ): Promise<EventRegistrationCompleteResponse | null> {
    const result = await this.prisma.eventsRegistration.findFirst({
      where: { userId, eventId },
      include: { user: true, event: true }
    })

    return result
      ? EventRegistrationCompleteResponse.fromPersistence(result)
      : null
  }

  async countByEvent(
    eventId: string,
    statuses: RegistrationStatusValueObject[]
  ): Promise<number> {
    return this.prisma.eventsRegistration.count({
      where: {
        eventId,
        status: {
          in: RegistrationStatusMapper.arrayToPersistence(statuses)
        }
      }
    })
  }

  async findRegistrationById(
    registrationId: string
  ): Promise<EventRegistrationDomain | null> {
    const result = await this.prisma.eventsRegistration.findUnique({
      where: { id: registrationId },
      include: { event: true }
    })

    return result ? RegistrationMapper.toDomain(result) : null
  }

  async updateRegistrationStatus(
    registrationId: string,
    status: RegistrationStatusValueObject
  ): Promise<EventRegistrationDomain> {
    const result = await this.prisma.eventsRegistration.update({
      where: { id: registrationId },
      data: {
        status: RegistrationStatusMapper.toPersistence(status),
        updatedAt: new Date()
      }
    })

    return RegistrationMapper.toDomain(result)
  }

  async findRegistrationsByEventId(
    eventId: string
  ): Promise<EventRegistrationCompleteResponse[]> {
    const results = await this.prisma.eventsRegistration.findMany({
      where: {
        eventId,
        status: {
          not: { in: [RegistrationStatus.CANCELED] }
        }
      },
      include: { user: true, event: true }
    })
    return EventRegistrationCompleteResponse.fromPersistenceArray(results)
  }

  async findAllConfirmedUsersByEvent(
    eventId: string
  ): Promise<EventWithUsersResponse | null> {
    const result = await this.prisma.eventsRegistration.findMany({
      where: {
        eventId,
        status: RegistrationStatusValueObject.CONFIRMED
      },
      include: {
        user: true,
        event: true
      }
    })
    const confirmedRegistrations =
      EventRegistrationCompleteResponse.fromPersistenceArray(result)
    const users = confirmedRegistrations.map((r) => r.user)
    const event = confirmedRegistrations.at(0)?.event
    return event ? EventWithUsersResponse.create(event, users) : null
  }

  async listRegistrationsComplete(
    filter: ListRegistrationsFilterRequest
  ): Promise<EventRegistrationCompleteResponse[]> {
    const result = await this.prisma.eventsRegistration.findMany({
      where: {
        eventId: filter.eventId,
        userId: filter.userId,
        status: filter.status as RegistrationStatus | undefined
      },
      include: { user: true, event: true }
    })
    return EventRegistrationCompleteResponse.fromPersistenceArray(result)
  }
}
