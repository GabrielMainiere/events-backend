import { randomUUID } from 'crypto';
import { Notification } from '../aggregates/notification.aggregate';
import { NotificationStatus } from '../enums/notification-status.enum';
import {
  CreateNotificationProps,
  NotificationProps,
} from '../aggregates/types/notification.types';

export class NotificationFactory {

  static create(props: CreateNotificationProps): Notification {
    return new Notification(
      randomUUID(),
      props.userId,
      props.notificationType,
      props.channel,
      props.recipientAddress,
      props.templateName,
      props.payload,
      NotificationStatus.PENDING,  
      undefined,  
      0, 
      undefined,
      new Date()
    );
  }

  static reconstitute(props: NotificationProps): Notification {
    return new Notification(
      props. id,
      props.userId,
      props.notificationType,
      props.channel,
      props.recipientAddress,
      props.templateName,
      props.payload,
      props.status,
      props.errorMessage,
      props.retryCount,
      props.sentAt,
      props.createdAt
    );
  }
}