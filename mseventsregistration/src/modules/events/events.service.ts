import { Inject, Injectable } from '@nestjs/common';
import { EventChangeAction } from 'src/enum/event-change-action';
import type { IEventsRepository } from './interfaces/IEventsRepository';
import { IEventsService } from './interfaces/IEventService';
import { RegistrationService } from 'src/modules/registrations/services/registrations.service';
import { EventChangeInput } from './dto/event-change.input';
import { tb_registered_event } from '@prisma/client';
import { EVENTS_REPOSITORY } from './providers/repository.provider';

@Injectable()
export class EventsService implements IEventsService {
  constructor(
    private readonly eventsRegistrationService: RegistrationService,
    @Inject(EVENTS_REPOSITORY)
    private readonly eventsRepository: IEventsRepository
  ) {}

  async handleEventChange(
    data: EventChangeInput,
    action: EventChangeAction
  ): Promise<void> {
    await this.handleUpsert(data, action);
    if (action === EventChangeAction.CANCEL)
      await this.handleCancelledEvent(data);
  }

  async handleCancelledEvent(data: EventChangeInput): Promise<void> {
    try {
      const event = await this.handleUpsert(data, EventChangeAction.CANCEL);
      if (event)
        await this.eventsRegistrationService.notifyUsersAboutCancellation(
          event
        );
    } catch (error) {
      console.log(`Failed to CANCEL event: ${error.message}`);
    }
  }

  private async handleUpsert(
    data: EventChangeInput,
    action: EventChangeAction
  ): Promise<tb_registered_event | void> {
    try {
      const existing = await this.eventsRepository.findById(data.id);
      if (existing) return await this.eventsRepository.update(data);

      return await this.eventsRepository.create(data);
    } catch (error) {
      console.log(`Failed to ${action} event: ${error.message}`);
      return;
    }
  }
}
