import { Registration } from 'src/modules/registrations/infraestructure/graphql/object-types/registration.entity'
import { tb_registered_event } from '@prisma/client'

export interface ICheckInValidator {
  validate(
    registration: Registration,
    event: tb_registered_event
  ): Promise<void>
}
