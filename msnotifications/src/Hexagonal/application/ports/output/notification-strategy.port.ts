import { NotificationChannel } from '../../../domain/enums/notification-channel.enum';

export interface INotificationStrategy {
  readonly channel: NotificationChannel;
  send(recipientAddress: string, subject: string, body: string): Promise<void>;
}