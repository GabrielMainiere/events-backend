import { tb_events_registration } from '@prisma/client';
import { Registration } from 'src/modules/registrations/entities/registration.entity';

export class RegistrationMapper {
  static toEntity(data: tb_events_registration): Registration {
    return {
      id: data.id,
      status: data.status,
      userId: data.user_id,
      eventId: data.registered_event_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }
}
