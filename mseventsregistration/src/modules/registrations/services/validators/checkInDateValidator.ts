import { Injectable } from '@nestjs/common';
import { ICheckInValidator } from './ICheckInValidator';
import { Registration } from 'src/modules/registrations/entities/registration.entity';
import { tb_registered_event } from '@prisma/client';

@Injectable()
export class CheckInDateValidator implements ICheckInValidator {
  async validate(
    _registration: Registration,
    event: tb_registered_event
  ): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventStartDate = new Date(event.start_at);
    eventStartDate.setHours(0, 0, 0, 0);

    const eventEndDate = new Date(event.end_at);
    eventEndDate.setHours(23, 59, 59, 999);

    if (today < eventStartDate) {
      throw new Error(
        'Check-in is not allowed yet. The event has not started.'
      );
    }

    if (today > eventEndDate) {
      throw new Error(
        'Check-in is no longer allowed. The event has already ended.'
      );
    }
  }
}
