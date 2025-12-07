import { IRegistrationRepository } from '../../repositories/IRegistration.repository'
import { ListRegistrationsFilterRequest } from '../dto/request/list-registrations-filter-request'
import { EventRegistrationCompleteResponse } from '../dto/response/registration-complete.response'

export class ListRegistrationsUseCase {
  constructor(private readonly registrationRepo: IRegistrationRepository) {}

  async execute(
    filter: ListRegistrationsFilterRequest
  ): Promise<EventRegistrationCompleteResponse[]> {
    return this.registrationRepo.listRegistrationsComplete(filter)
  }
}
