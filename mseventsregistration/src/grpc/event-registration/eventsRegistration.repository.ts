import { Injectable } from '@nestjs/common';
import {
  tb_registered_event,
  tb_events_registration,
  EventStatus,
  RegistrationStatus,
  EventType
} from '@prisma/client';
import { IEventNotificationRequest } from './interfaces/IEventRegistrationRequest';
import { PrismaSingleton } from 'src/core/prismaSingleton';

@Injectable()
export class EventsRegistrationRepository {
  private prisma = PrismaSingleton.getInstance();

  async createEventIfNotExists(data: IEventNotificationRequest) {
    const existing = await this.prisma.tb_registered_event.findUnique({
      where: { id: data.id }
    });
    const eventStatus = data.status as EventStatus;
    const eventType = data.eventType as EventType;

    if (!existing) {
      return this.prisma.tb_registered_event.create({
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
  }

  async updateEvent(data: IEventNotificationRequest) {
    const eventStatus = data.status as EventStatus;
    const eventType = data.eventType as EventType;

    return this.prisma.tb_registered_event.update({
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

  async updateEventStatus(id: string, status: EventStatus) {
    return this.prisma.tb_registered_event.update({
      where: { id },
      data: { status }
    });
  }

  async findById(id: string): Promise<tb_registered_event | null> {
    return this.prisma.tb_registered_event.findUnique({
      where: { id }
    });
  }

  async findUserById(id: string) {
    return this.prisma.tb_user.findUnique({
      where: { id }
    });
  }

  async countRegistrations(eventId: string): Promise<number> {
    return this.prisma.tb_events_registration.count({
      where: {
        registered_event_id: eventId,
        status: RegistrationStatus.CONFIRMED
      }
    });
  }

  async findRegistration(
    eventId: string,
    userId: string
  ): Promise<tb_events_registration | null> {
    return this.prisma.tb_events_registration.findFirst({
      where: {
        registered_event_id: eventId,
        user_id: userId
      }
    });
  }
}
