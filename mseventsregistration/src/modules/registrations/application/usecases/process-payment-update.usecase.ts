import { PaymentStatusMapper } from 'src/mappers/paymentStatusMapper'
import { EventRegistrationService } from '../../domain/registration.service'
import { IRegistrationRepository } from '../../repositories/IRegistration.repository'
import { RegistrationStatusValueObject } from '../../domain/value-objects/registration-status.vo'
import { IUserRepository } from 'src/modules/users/domain/IUserRepository'
import { IEventsRepository } from 'src/modules/events/domain/IEventsRepository'
import { PaymentStatus } from 'src/enum/payment-status'
import { EventNotificationService } from 'src/modules/notifications/event-notification/event-notification.service'

export class ProcessPaymentUpdateUseCase {
  constructor(
    private readonly registrationRepo: IRegistrationRepository,
    private readonly registrationService: EventRegistrationService,
    private readonly userRepo: IUserRepository,
    private readonly eventRepo: IEventsRepository,
    private readonly eventNotificationService: EventNotificationService
  ) {}

  async execute(
    eventId: string,
    userId: string,
    status: PaymentStatus
  ): Promise<void> {
    const registration = await this.registrationRepo.findByUserAndEvent(
      userId,
      eventId
    )
    if (!registration) throw new Error('Registration not found')
    this.registrationService.validatePaymentStatusUpdate(registration)

    const paymentStatus = PaymentStatusMapper.map(status)
    const newStatus =
      paymentStatus === PaymentStatus.ACCEPTED
        ? RegistrationStatusValueObject.CONFIRMED
        : RegistrationStatusValueObject.CANCELLED

    await this.registrationRepo.updateRegistrationStatus(
      registration.id,
      newStatus
    )

    if (newStatus === RegistrationStatusValueObject.CONFIRMED) {
      const user = await this.userRepo.findById(userId)
      const event = await this.eventRepo.findById(eventId)

      if (user && event) {
        await this.eventNotificationService.sendEventRegistrationNotification(
          user,
          event
        )
      }
    }
  }
}
