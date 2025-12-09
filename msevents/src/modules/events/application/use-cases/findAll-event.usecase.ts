import { Injectable, Inject } from '@nestjs/common';
import type { EventRepositoryPort } from '../../domain/ports/out/eventRepository.port';
import { mapEvent } from '../mappers/event.mapper';
import { Event } from '../../domain/entities/event.entity';
import { FindAllEventsPort } from '../../domain/ports/in/findAllEvents.port';

@Injectable()
export class FindAllEventsUseCase implements FindAllEventsPort {
    constructor(
        @Inject('IEventRepository') private readonly repository: EventRepositoryPort,
    ) {}

    async getAllEvents(): Promise<Event[]> {
        const events = await this.repository.findAll();
        return events.map(mapEvent);
    }
}
