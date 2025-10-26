import { PrismaSingleton } from 'src/database/prisma/prismaSingleton';
import { tb_event } from 'generated/prisma';
import { EventProps } from './builder/IEventsBuilder';

export class EventRepository {
  private prisma = PrismaSingleton.getInstance();

  async create(eventData: EventProps): Promise<tb_event> {
    return this.prisma.tb_event.create({
      data: {
        title: eventData.title,
        description: eventData.description ?? null,
        start_at: eventData.startAt,
        end_at: eventData.endAt ?? null,
        address_street: eventData.addressStreet,
        address_number: eventData.addressNumber ?? null,
        address_city: eventData.addressCity,
        address_state: eventData.addressState,
        address_zipcode: eventData.addressZipcode,
        address_country: eventData.addressCountry,
        status: eventData.status,
        event_type: eventData.eventType,
      },
    });
  }


  async findAll(): Promise<tb_event[]> {
    return this.prisma.tb_event.findMany();
  }
}
