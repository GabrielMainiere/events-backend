import { Injectable } from '@nestjs/common';
import { EventRepository } from './events.repository';
import { CreateEventInput } from './dto/create-event.input';
import { Event } from './entities/event.entity';
import { mapEvent } from 'src/utils/mapEvent';

@Injectable()
export class EventsService {
  constructor(private readonly repository: EventRepository) {}

  async createEvent(input: CreateEventInput): Promise<Event> {
    const event = await this.repository.create(input);
    return mapEvent(event);
  }

  async getAllEvents(): Promise<Event[]> {
    const events = await this.repository.findAll();
    return events.map(mapEvent);
  }
}
