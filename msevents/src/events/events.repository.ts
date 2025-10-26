import { PrismaSingleton } from 'src/database/prisma/prismaSingleton';
import { EventStatus, tb_event } from 'generated/prisma';
import { EventProps } from './builder/IEventsBuilder';

export class EventRepository {
  private prisma = PrismaSingleton.getInstance();

  async create(eventData: EventProps): Promise<tb_event> {
    return this.prisma.tb_event.create({
      data: {
        title: eventData.title,
        description: eventData.description ?? null,
        start_at: eventData.startAt,
        end_at: eventData.endAt,
        price: eventData.price ?? null,
        sale_start_at: eventData.saleStartAt ?? null,
        sale_end_at: eventData.saleEndAt ?? null,
        address_street: eventData.addressStreet,
        address_number: eventData.addressNumber ?? null,
        address_city: eventData.addressCity,
        address_state: eventData.addressState,
        address_zipcode: eventData.addressZipcode,
        address_country: eventData.addressCountry,
        capacity: eventData.capacity,
        isFree: eventData.isFree,
        status: eventData.status,
        event_type: eventData.eventType,
      },
    });
  }

  async update(id: string, data: Partial<EventProps>): Promise<tb_event> {
    return this.prisma.tb_event.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        start_at: data.startAt,
        end_at: data.endAt,
        price: data.price,
        isFree: data.isFree,
        capacity: data.capacity,
        address_street: data.addressStreet,
        address_number: data.addressNumber,
        address_city: data.addressCity,
        address_state: data.addressState,
        address_zipcode: data.addressZipcode,
        address_country: data.addressCountry,
        status: data.status,
        updated_at: new Date(),
      },
    });
  }

  async getById(id: string): Promise<tb_event | null> {
    return this.prisma.tb_event.findUnique({ where: { id } });
  }

  async findAll(): Promise<tb_event[]> {
    return this.prisma.tb_event.findMany();
  }

  async cancel(id: string): Promise<tb_event> {
    return this.prisma.tb_event.update({
      where: { id },
      data: {
        status: EventStatus.CANCELLED,
        updated_at: new Date(),
      },
    });
  }
}
