import { RegistrationStatusValueObject } from '../../domain/value-objects/registration-status.vo'
import { IRegistrationRepository } from '../../domain/IRegistrationRepository'

export class CountRegistrationsUseCase {
  constructor(private readonly registrationRepo: IRegistrationRepository) {}

  async execute(eventId: string): Promise<{ count: number }> {
    const count = await this.registrationRepo.countByEvent(eventId, [
      RegistrationStatusValueObject.CONFIRMED
    ])
    return { count }
  }
}
