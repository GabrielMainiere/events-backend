import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { Event } from '../../domain/entities/event.entity';
import { CancelEventPort } from '../../domain/ports/in/cancelEvent.port';
import type { EventRepositoryPort } from '../../domain/ports/out/eventRepository.port';
import type { EventNotifierPort } from '../../domain/ports/out/eventNotifierr.port';

@Injectable()
export class CancelEventUseCase implements CancelEventPort {
  constructor(
    @Inject('IEventRepository') private readonly repository: EventRepositoryPort,
    @Inject('IEventNotifier') private readonly notifier: EventNotifierPort,
  ) {}

  async cancelEvent(id: string): Promise<Event> {
    const event = await this.repository.getById(id);
    if (!event) throw new NotFoundException(`Event with id ${id} not found`);

    try {
      event.cancel();
    } catch (err) {
      throw new BadRequestException((err as Error).message);
    }

    const updated = await this.repository.cancel(id);
    await this.notifier.notifyCancelled(updated);

    return updated;
  }
}
