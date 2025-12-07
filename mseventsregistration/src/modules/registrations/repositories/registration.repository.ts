import { Injectable } from '@nestjs/common'
import { PrismaSingleton } from 'src/core/prismaSingleton'
import { IRegistrationRepository } from './IRegistration.repository'
import { Registration } from '../infraestructure/graphql/object-types/registration.entity'
import {
  RegistrationStatus,
  tb_registered_event,
  tb_user
} from '@prisma/client'
import { RegistrationMapper } from 'src/mappers/registrationMapper'
import { EventRegistrationCompleteResponse } from '../dto/event-registration-complete.response'

@Injectable()
export class RegistrationRepository implements IRegistrationRepository {
  private prisma = PrismaSingleton.getInstance()

  async createRegistration(data: {
    userId: string
    eventId: string
    status: string
  }): Promise<Registration> {
    const result = await this.prisma.tb_events_registration.create({
      data: {
        user_id: data.userId,
        registered_event_id: data.eventId,
        status: data.status as RegistrationStatus
      }
    })

    return RegistrationMapper.toEntity(result)
  }

  async findByUserAndEvent(
    userId: string,
    eventId: string
  ): Promise<Registration | null> {
    const result = await this.prisma.tb_events_registration.findFirst({
      where: { user_id: userId, registered_event_id: eventId }
    })

    return result ? RegistrationMapper.toEntity(result) : null
  }

  async countByEvent(
    eventId: string,
    statuses: RegistrationStatus[]
  ): Promise<number> {
    return this.prisma.tb_events_registration.count({
      where: {
        registered_event_id: eventId,
        status: {
          in: statuses
        }
      }
    })
  }

  async findEventById(eventId: string): Promise<tb_registered_event | null> {
    return this.prisma.tb_registered_event.findUnique({
      where: { id: eventId }
    })
  }

  async findRegistrationById(
    registrationId: string
  ): Promise<Registration | null> {
    const result = await this.prisma.eventsRegistration.findUnique({
      where: { id: registrationId },
      include: { registeredEvent: true }
    })

    return result ? RegistrationMapper.toEntity(result) : null
  }

  async updateRegistrationStatus(
    registrationId: string,
    status: string
  ): Promise<Registration> {
    const result = await this.prisma.tb_events_registration.update({
      where: { id: registrationId },
      data: {
        status: status as RegistrationStatus,
        updated_at: new Date()
      }
    })

    return RegistrationMapper.toEntity(result)
  }

  async findRegistrationsByEventId(
    eventId: string
  ): Promise<EventRegistrationCompleteResponse[]> {
    const results = await this.prisma.tb_events_registration.findMany({
      where: {
        registered_event_id: eventId,
        status: {
          not: { in: [RegistrationStatus.CANCELED] }
        }
      },
      include: { user: true, registered_event: true }
    })
    return results
  }

  async findAllConfirmedUsersByEvent(
    eventId: string
  ): Promise<{ event: tb_registered_event; users: tb_user[] }> {
    const event = await this.prisma.tb_registered_event.findUnique({
      where: { id: eventId }
    })
    if (!event) {
      throw new Error('Event not found')
    }

    const confirmedRegistrations =
      await this.prisma.tb_events_registration.findMany({
        where: {
          registered_event_id: eventId,
          status: 'CONFIRMED'
        },
        include: {
          user: true
        }
      })

    const users = confirmedRegistrations.map((r) => r.user)
    return { event, users }
  }
}
