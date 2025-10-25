import { PrismaSingleton } from 'src/database/prisma/prismaSingleton';
import { tb_event } from 'generated/prisma';
import { CreateEventInput } from './dto/create-event.input';

export class EventRepository {
  private prisma = PrismaSingleton.getInstance();

  async create(data: CreateEventInput): Promise<tb_event> {
    return this.prisma.tb_event.create({
      data: {
        title: data.title,
        description: data.description,
        start_at: new Date(data.startAt),
        end_at: data.endAt ? new Date(data.endAt) : null,
        location: data.location,
        status: data.status,
        event_type: data.eventType,
      },
    });
  }

  async findAll(): Promise<tb_event[]> {
    return this.prisma.tb_event.findMany();
  }
}
