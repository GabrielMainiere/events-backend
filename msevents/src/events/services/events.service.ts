import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { CreateEventInput } from '../dto/create-event.input';
import { UpdateEventInput } from '../dto/update-event-input';
import { Event } from '../entities/event.entity';
import { mapEvent } from 'src/utils/mapEvent';
import { validateEventPricing } from 'src/utils/priceValidation';
import { EventStatus } from 'generated/prisma';
import { EventBuilder } from '../builder/eventsBuilder';
import { EventDirector } from '../builder/eventDirector';
import { AddressProps } from '../builder/IEventsBuilder';
import type { IEventNotifier } from './IEventNotifier';
import type { IEventRepository } from '../repositories/IEventRepository';
import type { IEventRegistrationCount } from 'src/grpc/interfaces/IEventRegistrationCount';

@Injectable()
export class EventsService {
  constructor(
    @Inject('IEventRepository') private readonly repository: IEventRepository,
    @Inject('IEventNotifier') private readonly notifier: IEventNotifier,
    @Inject('IEventRegistrationCount') private readonly Registrationcount : IEventRegistrationCount
  ) {}

  async createEvent(input: CreateEventInput): Promise<Event> {
    validateEventPricing(input.isFree, input.price);

    const builder = new EventBuilder();
    const director = new EventDirector();
    director.setBuilder(builder);

    const address: AddressProps = {
      street: input.address.street,
      number: input.address.number ?? '',
      city: input.address.city,
      state: input.address.state,
      zipcode: input.address.zipcode,
      country: input.address.country,
    };

    const eventData = director.buildFullEvent(
      input.title,
      new Date(input.startAt),
      new Date(input.endAt ?? input.startAt),
      address,
      input.capacity,
      input.isFree,
      input.description,
      input.price,
      input.saleStartAt ? new Date(input.saleStartAt) : undefined,
      input.saleEndAt ? new Date(input.saleEndAt) : undefined
    );

    const event = await this.repository.create(eventData);
    await this.notifier.notifyCreated(event);
    return mapEvent(event);
  }

  async updateEvent(input: UpdateEventInput): Promise<Event> {
    const existing = await this.repository.getById(input.id);
    if (!existing) throw new NotFoundException(`Event with id ${input.id} not found`);

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
      address: input.address
        ? {
            street: input.address.street,
            number: input.address.number ?? undefined,
            city: input.address.city,
            state: input.address.state,
            zipcode: input.address.zipcode,
            country: input.address.country,
          }
        : undefined,
      eventType: existing.event_type,
      status: existing.status,
    });

    await this.notifier.notifyUpdated(updated);
    return mapEvent(updated);
  }

  async getEventById(id: string): Promise<Event> {
    const event = await this.repository.getById(id);
    if (!event) throw new NotFoundException(`Event with id ${id} not found`);
    return mapEvent(event);
  }

  async getAllEvents(): Promise<Event[]> {
    const events = await this.repository.findAll();
    return events.map(mapEvent);
  }

  async cancelEvent(id: string): Promise<Event> {
    const event = await this.repository.getById(id);
    if (!event) throw new NotFoundException(`Event with id ${id} not found`);
    if (event.status === EventStatus.CANCELED) throw new BadRequestException(`Event already canceled`);
    if (!event.isFree) throw new BadRequestException('Only free events can be canceled');
  
    const { count } = await this.Registrationcount.countEventRegistrations({ eventId: id });

    if (count > 0) {
      throw new BadRequestException(`Cannot cancel event with ${count} registered users`);
    }

    const updated = await this.repository.cancel(id);
    await this.notifier.notifyCancelled(updated);
    return mapEvent(updated);
  }
}
