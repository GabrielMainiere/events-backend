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
import { EventRegistrationClient } from 'src/grpc/clients/eventRegistrationClient';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class EventsService {
  constructor(private readonly repository: EventRepository, private readonly grpcClient: EventRegistrationClient) {}

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

    try {
      await lastValueFrom(this.grpcClient.notifyEventCreated({
        id: event.id,
        title: event.title,
        description: event.description ?? '',
        startAt: event.start_at.toISOString(),
        endAt: event.end_at.toISOString(),
        price: event.price ?? 0,
        saleStartAt: event.sale_start_at?.toISOString() ?? '',
        saleEndAt: event.sale_end_at?.toISOString() ?? '',
        addressStreet: event.address_street,
        addressNumber: event.address_number ?? '',
        addressCity: event.address_city,
        addressState: event.address_state,
        addressZipcode: event.address_zipcode,
        addressCountry: event.address_country,
        capacity: event.capacity,
        isFree: event.isFree,
        eventType: event.event_type,
        status: event.status,
        createdAt: event.created_at.toISOString(),
        updatedAt: event.updated_at.toISOString(),
      }));
    } catch (error) {
      console.log(`Grpc NotifyEventCreated falhou: ${error.message}`);
    }
    
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

    try {
      await lastValueFrom(this.grpcClient.notifyEventUpdated({
        id: updated.id,
        title: updated.title,
        description: updated.description ?? '',
        startAt: updated.start_at.toISOString(),
        endAt: updated.end_at.toISOString(),
        price: updated.price ?? 0,
        saleStartAt: updated.sale_start_at?.toISOString() ?? '',
        saleEndAt: updated.sale_end_at?.toISOString() ?? '',
        addressStreet: updated.address_street,
        addressNumber: updated.address_number ?? '',
        addressCity: updated.address_city,
        addressState: updated.address_state,
        addressZipcode: updated.address_zipcode,
        addressCountry: updated.address_country,
        capacity: updated.capacity,
        isFree: updated.isFree,
        eventType: updated.event_type,
        status: updated.status,
        createdAt: updated.created_at.toISOString(),
        updatedAt: updated.updated_at.toISOString(),
      }));
    } catch (error) {
      console.log(`Grpc NotifyEventUpdated falhou: ${error.message}`);
    }

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

    try {
      await lastValueFrom(this.grpcClient.notifyEventCancelled({
        id: updated.id,
        title: updated.title,
        description: updated.description ?? '',
        startAt: updated.start_at.toISOString(),
        endAt: updated.end_at.toISOString(),
        price: updated.price ?? 0,
        saleStartAt: updated.sale_start_at?.toISOString() ?? '',
        saleEndAt: updated.sale_end_at?.toISOString() ?? '',
        addressStreet: updated.address_street,
        addressNumber: updated.address_number ?? '',
        addressCity: updated.address_city,
        addressState: updated.address_state,
        addressZipcode: updated.address_zipcode,
        addressCountry: updated.address_country,
        capacity: updated.capacity,
        isFree: updated.isFree,
        eventType: updated.event_type,
        status: updated.status,
        createdAt: updated.created_at.toISOString(),
        updatedAt: updated.updated_at.toISOString(),
      }));
    } catch (error) {
      console.log(`Grpc NotifyEventCancelled falhou: ${error.message}`);
    }
      return mapEvent(updated);
    }
  }
}
