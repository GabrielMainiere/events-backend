import { NotificationChannel } from '@prisma/client';
import { INotificationStrategy } from 'src/modules/strategy/interfaces/iNotificationStrategy';

export interface IStrategyFactory {
  getStrategy(channel: NotificationChannel): INotificationStrategy;
}