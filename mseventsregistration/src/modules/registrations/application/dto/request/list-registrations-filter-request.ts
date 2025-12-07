import { RegistrationStatusValueObject } from 'src/modules/registrations/domain/value-objects/registration-status.vo'
export class ListRegistrationsFilterRequest {
  eventId: string
  userId: string
  status: RegistrationStatusValueObject
}
