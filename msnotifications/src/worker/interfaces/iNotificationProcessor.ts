import { NotificationLog } from '@prisma/client';

export interface INotificationProcessor {
  process(notification: NotificationLog): Promise<boolean>;
}