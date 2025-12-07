import { RegistrationStatusValueObject } from '../domain/value-objects/registration-status.vo'
import { EventRegistrationDomain } from '../domain/registrations.entity'
import { EventRegistrationCompleteResponse } from '../application/dto/response/registration-complete.response'

import { ListRegistrationsFilterRequest } from '../application/dto/request/list-registrations-filter-request'
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

  listRegistrationsComplete(
    filter: ListRegistrationsFilterRequest
  ): Promise<EventRegistrationCompleteResponse[]>
}
