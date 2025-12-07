import { RegistrationStatus } from '@prisma/client'
import { RegistrationStatusValueObject } from '../../domain/value-objects/registration-status.vo'
export class RegistrationStatusMapper {
  static toDomain(status: RegistrationStatus): RegistrationStatusValueObject {
    return status as RegistrationStatusValueObject
  }

  static toPersistence(
    status: RegistrationStatusValueObject
  ): RegistrationStatus {
    return status as RegistrationStatus
  }

  static arrayToPersistence(
    statuses: RegistrationStatusValueObject[]
  ): RegistrationStatus[] {
    return statuses.map((s) => this.toPersistence(s))
  }

  static arrayToDomain(
    statuses: RegistrationStatus[]
  ): RegistrationStatusValueObject[] {
    return statuses.map((s) => this.toDomain(s))
  }
}
