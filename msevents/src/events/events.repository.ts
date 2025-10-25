import { PrismaSingleton } from 'src/database/prisma/prismaSingleton';
import { tb_event } from 'generated/prisma';
import { CreateEventInput } from './dto/create-event.input';

export class EventRepository {
  private prisma = PrismaSingleton.getInstance();

  async create(data: CreateEventInput): Promise<tb_event> {
    return this.prisma.tb_event.create({
      data: {
        title: data.title,
        description: data.description ?? null,
        start_at: new Date(data.startAt),
        end_at: data.endAt ? new Date(data.endAt) : null,
        price: data.price,
        sale_start_at: new Date(data.saleStartAt),
        sale_end_at: data.saleEndAt ? new Date(data.saleEndAt) : null,
        address_street: data.addressStreet,
        address_number: data.addressNumber ?? null,
        address_city: data.addressCity,
        address_state: data.addressState,
        address_zipcode: data.addressZipcode,
        address_country: data.addressCountry,
        status: data.status ?? 'DRAFT',
        event_type: data.eventType ?? 'MEETING',
      },
    });
  }

  async findAll(): Promise<tb_event[]> {
    return this.prisma.tb_event.findMany();
  }
}
