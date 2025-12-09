import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { mapEvent } from '../mappers/event.mapper';
import type { IEventRepository } from '../../domain/ports/out/IEventRepository';
import type { IEventNotifier } from '../../domain/ports/out/IEventNotifier';
import { EventStatus } from 'generated/prisma';
import { Event } from '../../domain/entities/event.entity';
import { CancelEventPort } from '../../domain/ports/in/cancelEvent.port';

@Injectable()
export class CancelEventUseCase implements CancelEventPort {
    constructor(
        @Inject('IEventRepository') private readonly repository: IEventRepository,
        @Inject('IEventNotifier') private readonly notifier: IEventNotifier,
    ) {}

    async cancelEvent(id: string): Promise<Event> {
        const event = await this.repository.getById(id);
        if (!event) throw new NotFoundException(`Event with id ${id} not found`);
        if (event.status === EventStatus.CANCELED) throw new BadRequestException(`Event already canceled`);
        if (!event.isFree) throw new BadRequestException('Only free events can be canceled');
    
        const updated = await this.repository.cancel(id);
        await this.notifier.notifyCancelled(updated);
        return mapEvent(updated);
    }
}
