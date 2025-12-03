import {
  RegistrationStatus,
  tb_registered_event,
  tb_user
} from '@prisma/client';

export class EventRegistrationCompleteResponse {
  id: string;
  user_id: string;
  registered_event_id: string;
  status: RegistrationStatus;
  created_at: Date;
  updated_at: Date;

  user: tb_user;
  registered_event: tb_registered_event;
}
