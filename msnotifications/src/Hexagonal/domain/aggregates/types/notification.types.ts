import { UserId } from '../../value-objects/user-id.vo';
import { Email } from '../../value-objects/email.vo';
import { NotificationType } from '../../value-objects/notification-type.vo';
import { NotificationChannel } from '../../value-objects/notification-channel.vo';
import { NotificationStatus } from '../../value-objects/notification-status.vo';

export interface CreateNotificationProps {
  userId: UserId;
  notificationType: NotificationType;
  channel: NotificationChannel;
  recipientAddress: Email;
  templateName: string;
  payload: Record<string, any>;
}

export interface NotificationProps {
  id: string;
  userId: UserId;
  notificationType: NotificationType;
  channel: NotificationChannel;
  recipientAddress: Email;
  templateName: string;
  payload: Record<string, any>;
  status: NotificationStatus;
  errorMessage?: string;
  retryCount: number;
  sentAt?: Date;
  createdAt: Date;
}