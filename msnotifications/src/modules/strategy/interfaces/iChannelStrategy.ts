import { NotificationChannel } from '@prisma/client';
import { INotificationStrategy } from './iNotificationStrategy';

export interface IChannelStrategy extends INotificationStrategy {
  readonly channel: NotificationChannel;
}