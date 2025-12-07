import { IRegistrationRepository } from '../../repositories/IRegistration.repository'
import { EventWithUsersResponse } from '../dto/response/event-with-users.response.dto'

export class GetUsersOnEventUseCase {
  constructor(private readonly registrationRepo: IRegistrationRepository) {}

  async execute(eventId: string): Promise<EventWithUsersResponse> {
    const eventWithUsers =
      await this.registrationRepo.findAllConfirmedUsersByEvent(eventId)

    if (!eventWithUsers) throw new Error('Event not found.')
    return eventWithUsers
  }
}
