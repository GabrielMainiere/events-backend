import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { EventRepositoryPort } from '../../domain/ports/out/eventRepository.port';
import { Event } from '../../domain/entities/event.entity';
import { GetEventByIdPort } from '../../domain/ports/in/getEventById.port';

@Injectable()
export class GetEventUseCase implements GetEventByIdPort {
    constructor(
        @Inject('IEventRepository') private readonly repository: EventRepositoryPort,
    ) {}

    async getById(id: string): Promise<Event> {
        const event = await this.repository.getById(id);
        if (!event) throw new NotFoundException(`Event with id ${id} not found`);
        return event;
    }
}
