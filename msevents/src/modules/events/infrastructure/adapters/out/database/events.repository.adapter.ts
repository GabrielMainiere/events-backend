import { PrismaSingleton } from 'src/core/prisma/prismaSingleton';
import { EventStatus, tb_event } from '@prisma/client';
import { EventProps } from 'src/modules/events/domain/factories/builder/IEventsBuilder';
import { EventRepositoryPort } from 'src/modules/events/domain/ports/out/eventRepository.port';

export type EventWithAddress = tb_event & {
  address: {
    id: string;
    street: string;
    number: string | null;
    city: string;
    state: string;
    zipcode: string;
    country: string;
  };
};

export class EventRepository implements EventRepositoryPort{
  private prisma = PrismaSingleton.getInstance();

  async create(eventData: EventProps): Promise<EventWithAddress> {
    return this.prisma.tb_event.create({
      data: {
        title: eventData.title,
        description: eventData.description ?? null,
        start_at: eventData.startAt,
        end_at: eventData.endAt,
        price: eventData.price ?? null,
        sale_start_at: eventData.saleStartAt ?? null,
        sale_end_at: eventData.saleEndAt ?? null,
        capacity: eventData.capacity,
        isFree: eventData.isFree,
        status: eventData.status,
        event_type: eventData.eventType,
        address: {
          create: {
            street: eventData.address.street,
            number: eventData.address.number ?? null,
            city: eventData.address.city,
            state: eventData.address.state,
            zipcode: eventData.address.zipcode,
            country: eventData.address.country,
          },
        },
      },
      include: { address: true },
    });
  }

  async update(id: string, data: Partial<EventProps>): Promise<EventWithAddress> {
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
        status: data.status,
        event_type: data.eventType,
        address: data.address
          ? {
              update: {
                street: data.address.street,
                number: data.address.number,
                city: data.address.city,
                state: data.address.state,
                zipcode: data.address.zipcode,
                country: data.address.country,
              },
            }
          : undefined,
      },
      include: { address: true },
    });
  }

  async getById(id: string): Promise<EventWithAddress | null> {
    return this.prisma.tb_event.findUnique({
      where: { id },
      include: { address: true },
    });
  }

  async findAll(): Promise<EventWithAddress[]> {
    return this.prisma.tb_event.findMany({ include: { address: true } });
  }

  async cancel(id: string): Promise<EventWithAddress> {
    return this.prisma.tb_event.update({
      where: { id },
      data: {
        status: EventStatus.CANCELED,
        updated_at: new Date(),
      },
      include: { address: true },
    });
  }
}
