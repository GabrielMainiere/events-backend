import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UpdateEventInput } from '../dto/update-event-input';
import { mapEvent } from '../mappers/event.mapper';
import type { IEventRepository } from '../../domain/ports/out/IEventRepository';
import type { IEventNotifier } from '../../domain/ports/out/IEventNotifier';
import { validateEventPricing } from '../../domain/services/priceValidation';
import { Event } from '../../domain/entities/event.entity';
import { UpdareEventPort } from '../../domain/ports/in/updateEvent.port';

@Injectable()
export class UpdateEventUseCase implements UpdareEventPort {
  constructor(
    @Inject('IEventRepository') private readonly repository: IEventRepository,
    @Inject('IEventNotifier') private readonly notifier: IEventNotifier,
  ) {}

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

    await this.notifier.notifyCreatedOrUpdated(updated);
    return mapEvent(updated);
  }
}
