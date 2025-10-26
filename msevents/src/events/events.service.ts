import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EventRepository } from './events.repository';
import { CreateEventInput } from './dto/create-event.input';
import { Event } from './entities/event.entity';
import { mapEvent } from 'src/utils/mapEvent';
import { EventBuilder } from './builder/eventsBuilder';
import { EventDirector } from './builder/eventDirector';
import { validateEventPricing } from '../utils//priceValidation';
import { UpdateEventInput } from './dto/update-event-input';
import { EventStatus } from 'generated/prisma';

@Injectable()
export class EventsService {
  constructor(private readonly repository: EventRepository) {}

  async createEvent(input: CreateEventInput): Promise<Event> {

    validateEventPricing(input.isFree, input.price);

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
      input.capacity,
      input.isFree,
      input.description,
      input.price,
      input.saleStartAt ? new Date(input.saleStartAt) : undefined,
      input.saleEndAt ? new Date(input.saleEndAt) : undefined
    );

    const event = await this.repository.create(eventData);
    return mapEvent(event);
  }

  async updateEvent(input: UpdateEventInput): Promise<Event> {
    const existing = await this.repository.getById(input.id);
    if (!existing) {
      throw new NotFoundException(`Event with id ${input.id} not found`);
    }
    const finalIsFree = input.isFree ?? existing.isFree;
    const finalPrice = input.price ?? existing.price ?? undefined;

    validateEventPricing(finalIsFree, finalPrice);

    const updated = await this.repository.update(input.id, {
      title: input.title ?? existing.title,
      description: input.description ?? existing.description ?? undefined,
      startAt: input.startAt ?? existing.start_at,
      endAt: input.endAt ?? existing.end_at,
      price: finalPrice,
      isFree: finalIsFree,
      capacity: input.capacity ?? existing.capacity,
      addressStreet: input.addressStreet ?? existing.address_street,
      addressNumber: input.addressNumber ?? existing.address_number ?? undefined,
      addressCity: input.addressCity ?? existing.address_city,
      addressState: input.addressState ?? existing.address_state,
      addressZipcode: input.addressZipcode ?? existing.address_zipcode,
      addressCountry: input.addressCountry ?? existing.address_country,
      eventType: existing.event_type,
      status: existing.status,
    });

    return mapEvent(updated);
  }


  async getEventById(id: string): Promise<Event> {
    const event = await this.repository.getById(id);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return mapEvent(event);
  }

  async getAllEvents(): Promise<Event[]> {
    const events = await this.repository.findAll();
    return events.map(mapEvent);
  }

  async cancelEvent(id: string): Promise<Event | undefined> {
    const event = await this.repository.getById(id);

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    if (event.status === EventStatus.CANCELLED) {
      throw new BadRequestException(`Event already cancelled`);
    }

    if (event.isFree) {
      const updated = await this.repository.update(event.id, {
        status: EventStatus.CANCELLED,
      });
      return mapEvent(updated);
    }
  }
}
