import { Inject, Injectable } from '@nestjs/common'

import { IEventsRepository } from '../domain/IEventsRepository'
import { PrismaClient } from '@prisma/client'
import { PRISMA_CLIENT } from 'src/core/constants'
import { EventChangeRequest } from '../application/dto/event-change.request'
import { EventDomain } from '../domain/event.entity'
import { EventMapper } from '../application/mappers/event.mapper'

@Injectable()
export class EventsRepository implements IEventsRepository {
  constructor(@Inject(PRISMA_CLIENT) private readonly prisma: PrismaClient) {}

  async upsert(data: EventChangeRequest): Promise<EventDomain> {
    const createdEvent = await this.prisma.event.upsert({
      where: { id: data.id },
      create: { ...data },
      update: { ...data }
    })
    return EventMapper.toDomain(createdEvent)
  }
  async findById(id: string): Promise<EventDomain | null> {
    const event = await this.prisma.event.findUnique({ where: { id } })

    return event ? EventMapper.toDomain(event) : null
  }
}
