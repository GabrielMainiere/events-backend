import { Injectable } from '@nestjs/common'
import { ICheckInValidator } from './ICheckInValidator'
import { Registration } from 'src/modules/registrations/infraestructure/graphql/object-types/registration.entity'
import { tb_registered_event } from '@prisma/client'

@Injectable()
export class CheckInStatusValidator implements ICheckInValidator {
  async validate(
    registration: Registration,
    _event: tb_registered_event
  ): Promise<void> {
    if (registration.status !== 'CONFIRMED') {
      throw new Error(
        `Cannot check-in. Registration status is: ${registration.status}. Only CONFIRMED registrations can be checked-in.`
      )
    }
  }
}
