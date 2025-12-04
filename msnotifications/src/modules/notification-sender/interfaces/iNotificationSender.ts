import { NotificationLog } from '@prisma/client';

export interface INotificationSender {
  send(notification: NotificationLog): Promise<void>;
}