import { NotificationChannel } from '@prisma/client';
import { NotificationType } from 'src/enum/notification-type.enum';

export class CreateNotificationLogDto {
  user_id: string;
  notification_type: NotificationType;
  channel: NotificationChannel;
  recipient_address: string;
  template_name: string;
  payload: Record<string, any>;
}