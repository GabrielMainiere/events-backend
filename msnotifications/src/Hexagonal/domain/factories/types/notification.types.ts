import { NotificationChannel } from "../../enums/notification-channel.enum";
import { NotificationStatus } from "../../enums/notification-status.enum";
import { NotificationType } from "../../enums/notification-type.enum";
import { Email } from "../../value-objects/email.vo";

export interface CreateNotificationProps {
  userId: string;
  notificationType: NotificationType;
  channel: NotificationChannel;
  recipientAddress: Email;
  templateName: string;
  payload: Record<string, any>;
}

export interface NotificationProps {
  id: string;
  userId: string;
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