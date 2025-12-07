import { RegistrationStatusValueObject } from './value-objects/registration-status.vo'
import { EventRegistrationDomain } from './registrations.entity'
import { EventRegistrationCompleteResponse } from '../application/dto/response/registration-complete.response'
import { EventWithUsersResponse } from '../application/dto/response/event-with-users.response.dto'

export interface IRegistrationRepository {
  createRegistration(data: {
    userId: string
    eventId: string
    status: RegistrationStatusValueObject
  }): Promise<EventRegistrationCompleteResponse>

  findByUserAndEvent(
    userId: string,
    eventId: string
  ): Promise<EventRegistrationCompleteResponse | null>

  countByEvent(
    eventId: string,
    statuses: RegistrationStatusValueObject[]
  ): Promise<number>

  findRegistrationById(
    registrationId: string
  ): Promise<EventRegistrationDomain | null>

  updateRegistrationStatus(
    registrationId: string,
    status: string
  ): Promise<EventRegistrationDomain>

  findRegistrationsByEventId(
    eventId: string
  ): Promise<EventRegistrationCompleteResponse[]>

  findAllConfirmedUsersByEvent(
    eventId: string
  ): Promise<EventWithUsersResponse | null>
}
