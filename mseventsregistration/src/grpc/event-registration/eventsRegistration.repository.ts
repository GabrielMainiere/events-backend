import { Injectable } from '@nestjs/common';
import { tb_registered_event, EventStatus, EventType } from '@prisma/client'
import { IEventNotificationRequest } from './interfaces/IEventRegistrationRequest';
import { PrismaSingleton } from 'src/core/prismaSingleton';

@Injectable()
export class EventsRegistrationRepository {
  private prisma = PrismaSingleton.getInstance();

  async upsertEvent(data: IEventNotificationRequest): Promise<tb_registered_event> {
    const eventStatus = data.status as EventStatus;
    const eventType = data.eventType as EventType;

    return this.prisma.tb_registered_event.upsert({
      where: { id: data.id },
      update: {
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
        event_type: eventType,
      },
      create: {
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
        event_type: eventType,
      },
    });
  }

  async findById(id: string): Promise<tb_registered_event | null> {
    return this.prisma.tb_registered_event.findUnique({
      where: { id },
    });
  }

  async countRegistrations(eventId: string): Promise<number> {
    return this.prisma.tb_events_registration.count({
      where: { 
        registered_event_id: eventId, 
        status: 'CONFIRMED',
      },
    });
  }
}
