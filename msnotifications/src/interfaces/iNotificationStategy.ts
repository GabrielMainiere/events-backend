import { NotificationLog } from '@prisma/client';

export interface INotificationStrategy {
    
  send(notification: NotificationLog): Promise<void>;
}