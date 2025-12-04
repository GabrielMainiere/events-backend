import { Inject, Injectable } from '@nestjs/common';

import { IEventsRepository } from './interfaces/IEventsRepository';
import {
  EventStatus,
  EventType,
  PrismaClient,
  tb_registered_event
} from '@prisma/client';
import { PRISMA_CLIENT } from 'src/core/constants';
import { EventChangeInput } from './dto/event-change.input';

@Injectable()
export class EventsRepository implements IEventsRepository {
  constructor(@Inject(PRISMA_CLIENT) private readonly prisma: PrismaClient) {}

  async create(data: EventChangeInput): Promise<tb_registered_event> {
    const eventStatus = data.status as EventStatus;
    const eventType = data.eventType as EventType;

    return await this.prisma.tb_registered_event.create({
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        start_at: new Date(data.startAt),
        end_at: new Date(data.endAt),
        price: data.price,
        sale_start_at: data.saleStartAt ? new Date(data.saleStartAt) : null,
        sale_end_at: data.saleEndAt ? new Date(data.saleEndAt) : null,
        address_street: data.addressStreet,
        address_number: data.addressNumber,
        address_city: data.addressCity,
        address_state: data.addressState,
        address_zipcode: data.addressZipcode,
        address_country: data.addressCountry,
        capacity: data.capacity,
        is_free: data.isFree,
        status: eventStatus,
        event_type: eventType
      }
    });
  }

  async update(data: EventChangeInput): Promise<tb_registered_event> {
    const eventStatus = data.status as EventStatus;
    const eventType = data.eventType as EventType;

    return await this.prisma.tb_registered_event.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        start_at: new Date(data.startAt),
        end_at: new Date(data.endAt),
        price: data.price,
        sale_start_at: data.saleStartAt ? new Date(data.saleStartAt) : null,
        sale_end_at: data.saleEndAt ? new Date(data.saleEndAt) : null,
        address_street: data.addressStreet,
        address_number: data.addressNumber,
        address_city: data.addressCity,
        address_state: data.addressState,
        address_zipcode: data.addressZipcode,
        address_country: data.addressCountry,
        capacity: data.capacity,
        is_free: data.isFree,
        status: eventStatus,
        event_type: eventType
      }
    });
  }

  async findById(id: string): Promise<tb_registered_event | null> {
    const event = await this.prisma.tb_registered_event.findUnique({
      where: { id }
    });
    return event;
  }
}
