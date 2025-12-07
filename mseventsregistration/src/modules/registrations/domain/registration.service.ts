import { EventDomain } from 'src/modules/events/domain/event.entity'
import { RegistrationStatusValueObject } from './value-objects/registration-status.vo'
import { EventRegistrationDomain } from './registrations.entity'

export class EventRegistrationService {
  validateCheckIn(
    event: EventDomain,
    registrationStatus: RegistrationStatusValueObject
  ): void {
    if (registrationStatus !== RegistrationStatusValueObject.CONFIRMED)
      throw new Error(
        `Cannot check-in. Registration status is: ${registrationStatus}. Only CONFIRMED registrations can be checked-in.`
      )

    this.validateCheckInDate(event)
  }
  validateRegistration(
    event: EventDomain,
    currentRegistrationsCount: number,
    isUserAlreadyRegistered: boolean
  ): void {
    if (event.status === 'CANCELED')
      throw new Error('Cannot register user in a canceled event')

    if (currentRegistrationsCount >= event.capacity)
      throw new Error('The event has already reached maximum capacity.')

    if (isUserAlreadyRegistered)
      throw new Error('User is already registered for this event.')
  }

  validatePaymentStatusUpdate(registration: EventRegistrationDomain) {
    if (registration.status !== RegistrationStatusValueObject.WAITING_PAYMENT)
      throw new Error('Registration not in WAITING_PAYMENT status')
  }

  private validateCheckInDate(event: EventDomain): void {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const eventStartDate = new Date(event.startAt)
    eventStartDate.setHours(0, 0, 0, 0)

    const eventEndDate = new Date(event.endAt)
    eventEndDate.setHours(23, 59, 59, 999)

    if (today < eventStartDate)
      throw new Error('Check-in is not allowed yet. The event has not started.')

    if (today > eventEndDate)
      throw new Error(
        'Check-in is no longer allowed. The event has already ended.'
      )
  }
}
