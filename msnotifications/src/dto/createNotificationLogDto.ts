import { NotificationChannel } from 'generated/prisma/client';

export class CreateNotificationLogDto {
  user_id: string;
  channel: NotificationChannel;
  recipient_address: string;
  template_name: string;
  payload: Record<string, any>;
}