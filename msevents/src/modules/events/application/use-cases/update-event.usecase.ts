import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UpdateEventInput } from '../dto/update-event-input';
import type { EventRepositoryPort } from '../../domain/ports/out/eventRepository.port';
import type { EventNotifierPort } from '../../domain/ports/out/eventNotifierr.port';
import { validateEventPricing } from '../../domain/services/priceValidation';
import { Event } from '../../domain/entities/event.entity';
import { UpdateEventPort } from '../../domain/ports/in/updateEvent.port';
import { Address } from '../../domain/value-objects/address.entity';

@Injectable()
export class UpdateEventUseCase implements UpdateEventPort {
  constructor(
    @Inject('IEventRepository') private readonly repository: EventRepositoryPort,
    @Inject('IEventNotifier') private readonly notifier: EventNotifierPort,
  ) {}

  async updateEvent(input: UpdateEventInput): Promise<Event> {
    const existing = await this.repository.getById(input.id);
    if (!existing) throw new NotFoundException(`Event with id ${input.id} not found`);

    const finalIsFree = input.isFree ?? existing.isFree;
    const finalPrice = input.price ?? existing.price;
    validateEventPricing(finalIsFree, finalPrice);

    if (input.title !== undefined) existing.title = input.title;
    if (input.description !== undefined) existing.description = input.description;
    if (input.startAt !== undefined) existing.startAt = input.startAt;
    if (input.endAt !== undefined) existing.endAt = input.endAt;
    if (input.capacity !== undefined) existing.capacity = input.capacity;
    if (input.isFree !== undefined) existing.isFree = input.isFree;
    if (input.price !== undefined) existing.price = input.price;

    if (input.address) {
      existing.address = new Address(
        input.address.street,
        input.address.number,
        input.address.city,
        input.address.state,
        input.address.zipcode,
        input.address.country,
      );
    }

    existing.updatedAt = new Date();

    const updated = await this.repository.update(existing.id, {
      title: existing.title,
      description: existing.description,
      startAt: existing.startAt,
      endAt: existing.endAt,
      price: existing.price,
      isFree: existing.isFree,
      capacity: existing.capacity,
      address: {
        street: existing.address.street,
        number: existing.address.number,
        city: existing.address.city,
        state: existing.address.state,
        zipcode: existing.address.zipcode,
        country: existing.address.country,
      },
      status: existing.status,
      eventType: existing.eventType,
    });

    await this.notifier.notifyCreatedOrUpdated(updated);

    return updated;
  }
}
