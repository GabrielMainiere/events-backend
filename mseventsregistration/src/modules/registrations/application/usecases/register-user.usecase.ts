import { IEventsRepository } from 'src/modules/events/domain/IEventsRepository'
import { EventRegistrationService } from '../../domain/registration.service'
import { IRegistrationRepository } from '../../repositories/IRegistration.repository'
import { RegistrationStatusValueObject } from '../../domain/value-objects/registration-status.vo'
import { EventRegistrationDomain } from '../../domain/registrations.entity'
import { EventNotificationService } from 'src/modules/notifications/event-notification/event-notification.service'

export class RegisterUseCase {
  constructor(
    private readonly registrationRepo: IRegistrationRepository,
    private readonly registrationService: EventRegistrationService,
    private readonly eventRepo: IEventsRepository,
    private readonly eventNotificationService: EventNotificationService
  ) {}

  async execute(
    userId: string,
    eventId: string
  ): Promise<EventRegistrationDomain> {
    const [event, currentRegistrationsCount, isUserAlreadyRegistered] =
      await Promise.all([
        this.eventRepo.findById(eventId),
        this.registrationRepo.countByEvent(eventId, [
          RegistrationStatusValueObject.CONFIRMED,
          RegistrationStatusValueObject.WAITING_PAYMENT
        ]),
        this.registrationRepo.findByUserAndEvent(userId, eventId)
      ])

    if (!event) throw new Error('Event not found.')

    this.registrationService.validateRegistration(
      event,
      currentRegistrationsCount,
      Boolean(isUserAlreadyRegistered)
    )

    const registration = await this.registrationRepo.createRegistration({
      userId,
      eventId,
      status: event.isFree
        ? RegistrationStatusValueObject.CONFIRMED
        : RegistrationStatusValueObject.WAITING_PAYMENT
    })

    if (registration.status === RegistrationStatusValueObject.CONFIRMED) {
      await this.eventNotificationService.sendEventRegistrationNotification(
        registration.user,
        event
      )
      return registration
    }

    await this.eventNotificationService.sendWaitingPaymentNotification(
      registration.user,
      event
    )
    return registration
  }
}
