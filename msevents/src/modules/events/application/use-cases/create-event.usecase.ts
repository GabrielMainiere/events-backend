import { Injectable, Inject } from '@nestjs/common';
import { CreateEventInput } from '../dto/create-event.input';
import { mapEvent } from '../mappers/event.mapper';
import { EventDirector } from '../../domain/factories/builder/eventDirector';
import { EventBuilder } from '../../domain/factories/builder/eventsBuilder';
import type { EventRepositoryPort } from '../../domain/ports/out/eventRepository.port';
import type { EventNotifierPort } from '../../domain/ports/out/eventNotifierr.port';
import { validateEventPricing } from '../../domain/services/priceValidation';
import { AddressProps } from '../../domain/factories/builder/IEventsBuilder';
import { Event } from '../../domain/entities/event.entity';
import { CreateEventPort } from '../../domain/ports/in/createEvent.port';

@Injectable()
export class CreateEventUseCase implements CreateEventPort {
  constructor(
    @Inject('IEventRepository') private readonly repository: EventRepositoryPort,
    @Inject('IEventNotifier') private readonly notifier: EventNotifierPort,
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
    await this.notifier.notifyCreatedOrUpdated(event);
    return mapEvent(event);
  }
}
