import { NotificationChannel } from '../../../domain/enums/notification-channel.enum';
import type { INotificationStrategy } from './notification-strategy.port';

export interface IStrategyFactory {
  getStrategy(channel: NotificationChannel): INotificationStrategy;
}