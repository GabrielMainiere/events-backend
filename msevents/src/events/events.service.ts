import { Injectable } from '@nestjs/common';
import { EventRepository } from './events.repository';
import { CreateEventInput } from './dto/create-event.input';
import { Event } from './entities/event.entity';
import { mapEvent } from 'src/utils/mapEvent';
import { EventBuilder } from './builder/eventsBuilder';
import { EventDirector } from './builder/eventDirector';

@Injectable()
export class EventsService {
  constructor(private readonly repository: EventRepository) {}

  async createEvent(input: CreateEventInput): Promise<Event> {
    const builder = new EventBuilder();
    const director = new EventDirector();
    director.setBuilder(builder);

    const eventData = director.buildFullEvent(
      input.title,
      new Date(input.startAt),
      new Date(input.endAt),
      input.addressStreet,
      input.addressNumber ?? '',
      input.addressCity,
      input.addressState,
      input.addressZipcode,
      input.addressCountry,
      input.description,
      input.price,
      input.saleStartAt ? new Date(input.saleStartAt) : undefined,
      input.saleEndAt ? new Date(input.saleEndAt) : undefined
    );

    const event = await this.repository.create(eventData);
    return mapEvent(event);
  }

  async getAllEvents(): Promise<Event[]> {
    const events = await this.repository.findAll();
    return events.map(mapEvent);
  }
}
