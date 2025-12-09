import { Injectable, Inject } from '@nestjs/common';
import type { IEventRepository } from '../../domain/ports/out/IEventRepository';
import { mapEvent } from '../mappers/event.mapper';
import { Event } from '../../domain/entities/event.entity';
import { FindAllEventsPort } from '../../domain/ports/in/findAllEvents.port';

@Injectable()
export class FindAllEventsUseCase implements FindAllEventsPort {
    constructor(
        @Inject('IEventRepository') private readonly repository: IEventRepository,
    ) {}

    async getAllEvents(): Promise<Event[]> {
        const events = await this.repository.findAll();
        return events.map(mapEvent);
    }
}
