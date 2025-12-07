import { EventChangeAction } from 'src/enum/event-change-action'
import { IEventsRepository } from '../../domain/IEventsRepository'
import { EventChangeRequest } from '../dto/event-change.request'
import { EventDomain } from '../../domain/event.entity'
import { IRegistrationRepository } from 'src/modules/registrations/domain/IRegistrationRepository'
import { EventNotificationService } from 'src/modules/notifications/event-notification/event-notification.service'

export class HandleEventChangeUseCase {
  constructor(
    private readonly eventsRepo: IEventsRepository,
    private readonly registrationRepo: IRegistrationRepository,
    private readonly eventNotificationService: EventNotificationService
  ) {}

  async execute(
    data: EventChangeRequest,
    action: EventChangeAction
  ): Promise<void> {
    const event = await this.eventsRepo.upsert(data)
    if (action === EventChangeAction.CANCEL)
      await this.handleCancelledEvent(event)
  }

  async handleCancelledEvent(event: EventDomain): Promise<void> {
    const registrations =
      await this.registrationRepo.findRegistrationsByEventId(event.id)

    for (const registration of registrations) {
      const user = registration.user
      await this.eventNotificationService.sendEventCancellationNotification(
        user,
        event
      )
    }
  }
}
