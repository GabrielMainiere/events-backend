import { RegistrationStatusValueObject } from '../../domain/value-objects/registration-status.vo'
import { IRegistrationRepository } from '../../domain/IRegistrationRepository'
import { GetRegistrationResponse } from '../dto/response/get-registration.response'

export class GetRegistrationByUserAndEventUseCase {
  constructor(private readonly registrationRepo: IRegistrationRepository) {}

  async execute(
    eventId: string,
    userId: string
  ): Promise<GetRegistrationResponse> {
    const registration = await this.registrationRepo.findByUserAndEvent(
      userId,
      eventId
    )
    if (!registration) {
      throw new Error('Registration not found')
    }

    if (registration.status !== RegistrationStatusValueObject.WAITING_PAYMENT) {
      throw new Error('Registration is not in WAITING_PAYMENT status')
    }

    const { event, user } = registration

    const totalRegistrations = await this.registrationRepo.countByEvent(
      event.id,
      [RegistrationStatusValueObject.CONFIRMED]
    )
    const hasVacancy = totalRegistrations < event.capacity

    return GetRegistrationResponse.create(event, user, hasVacancy)
  }
}
