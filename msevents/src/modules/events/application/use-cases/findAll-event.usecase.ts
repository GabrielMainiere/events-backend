import { Injectable, Inject } from '@nestjs/common';
import type { IEventRepository } from '../../domain/ports/IEventRepository';
import { mapEvent } from '../mappers/event.mapper';
import { Event } from '../../domain/entities/event.entity';

@Injectable()
export class FindAllEventsUseCase {
    constructor(
        @Inject('IEventRepository') private readonly repository: IEventRepository,
    ) {}

    async getAllEvents(): Promise<Event[]> {
        const events = await this.repository.findAll();
        return events.map(mapEvent);
    }
}
