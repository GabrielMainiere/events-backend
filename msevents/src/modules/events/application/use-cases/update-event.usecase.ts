import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UpdateEventInput } from '../dto/update-event-input';
import { mapEvent } from '../mappers/event.mapper';
import type { EventRepositoryPort } from '../../domain/ports/out/eventRepository.port';
import type { EventNotifierPort } from '../../domain/ports/out/eventNotifierr.port';
import { validateEventPricing } from '../../domain/services/priceValidation';
import { Event } from '../../domain/entities/event.entity';
import { UpdateEventPort } from '../../domain/ports/in/updateEvent.port';

@Injectable()
export class UpdateEventUseCase implements UpdateEventPort {
  constructor(
    @Inject('IEventRepository') private readonly repository: EventRepositoryPort,
    @Inject('IEventNotifier') private readonly notifier: EventNotifierPort,
  ) {}

  async updateEvent(input: UpdateEventInput): Promise<Event> {
    const existing = await this.repository.getById(input.id);
    if (!existing) throw new NotFoundException(`Event with id ${input.id} not found`);

    const domainEvent = mapEvent(existing);

    const finalIsFree = input.isFree ?? domainEvent.isFree;
    const finalPrice = input.price ?? domainEvent.price ?? undefined;
    validateEventPricing(finalIsFree, finalPrice);

    const updated = await this.repository.update(input.id, {
      title: input.title ?? domainEvent.title,
      description: input.description ?? domainEvent.description ?? undefined,
      startAt: input.startAt ?? domainEvent.startAt,
      endAt: input.endAt ?? domainEvent.endAt,
      price: finalPrice,
      isFree: finalIsFree,
      capacity: input.capacity ?? domainEvent.capacity,
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
      eventType: domainEvent.eventType,
      status: domainEvent.status,
    });

    await this.notifier.notifyCreatedOrUpdated(updated);
    return mapEvent(updated);
  }
}
