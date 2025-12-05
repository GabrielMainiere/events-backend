import { randomUUID } from 'crypto';
import { Notification } from '../aggregates';
import { NotificationStatus } from '../value-objects/notification-status.vo';
import { CreateNotificationProps, NotificationProps } from '../aggregates/types/notification.types';


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
      NotificationStatus.createPending(),
      undefined,
      0,
      undefined,
      new Date()
    );
  }

  static reconstitute(props: NotificationProps): Notification {
    return new Notification(
      props.id,
      props.userId,
      props.notificationType,
      props.channel,
      props.recipientAddress,
      props.templateName,
      props. payload,
      props.status,
      props.errorMessage,
      props.retryCount,
      props.sentAt,
      props.createdAt
    );
  }
}