import { IEventsRepository } from 'src/modules/events/domain/IEventsRepository'

import { IRegistrationRepository } from '../../domain/IRegistrationRepository'
import { EventRegistrationService } from '../../domain/registration.service'
import { RegistrationStatusValueObject } from '../../domain/value-objects/registration-status.vo'
import { EventRegistrationDomain } from '../../domain/registrations.entity'
import { EventDomain } from 'src/modules/events/domain/event.entity'
import { QRCodeGenerator } from 'src/utils/qrCodeGenerator'
import { EventNotificationService } from 'src/modules/notifications/event-notification/event-notification.service'
import { EventRegistrationCompleteResponse } from '../dto/response/registration-complete.response'
import { QrCodeResponse } from '../dto/response/qr-code.response'

export class CheckinUseCase {
  constructor(
    private readonly registrationRepo: IRegistrationRepository,
    private readonly registrationService: EventRegistrationService,
    private readonly eventRepo: IEventsRepository,
    private readonly eventNotificationService: EventNotificationService
  ) {}

  private async performCheckIn(
    userId: string,
    eventId: string
  ): Promise<{
    registration: EventRegistrationCompleteResponse
    event: EventDomain
  }> {
    const [event, registration] = await Promise.all([
      this.eventRepo.findById(eventId),
      this.registrationRepo.findByUserAndEvent(userId, eventId)
    ])

    if (!event) throw new Error('Event not found.')
    if (!registration) throw new Error('Registration not found.')

    this.registrationService.validateCheckIn(event, registration.status)

    return { registration, event }
  }

  async execute(
    userId: string,
    eventId: string
  ): Promise<EventRegistrationDomain> {
    const { registration, event } = await this.performCheckIn(userId, eventId)

    await this.eventNotificationService.sendEventCheckInNotification(
      registration.user,
      event
    )
    return await this.registrationRepo.updateRegistrationStatus(
      registration.id,
      RegistrationStatusValueObject.CHECKED_IN
    )
  }

  async executeWithQrCode(
    userId: string,
    eventId: string
  ): Promise<QrCodeResponse> {
    const { event } = await this.performCheckIn(userId, eventId)

    const qrData = JSON.stringify({ userId, eventId })
    const base64 = await QRCodeGenerator.generateBase64(qrData)

    return {
      base64,
      expiresAt: event.endAt
    }
  }
}
