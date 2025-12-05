import { Notification } from '../../domain/aggregates/notification.aggregate';
import { CreateNotificationProps } from '../../domain/aggregates/types/notification.types';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { Email } from '../../domain/value-objects/email.vo';
import { NotificationType } from '../../domain/value-objects/notification-type.vo';
import { NotificationChannel } from '../../domain/value-objects/notification-channel.vo';
import { ProcessNotificationCommand } from '../dtos/notifications/process-notification.command';
import { NotificationResponse } from '../dtos/notifications/notification.response';

export class NotificationMapper {
  
  static commandToDomainProps(command: ProcessNotificationCommand): CreateNotificationProps {
    return {
      userId: UserId.create(command.userId),
      notificationType: NotificationType.fromString(command.notificationType),
      channel: NotificationChannel. fromString(command.channel),
      recipientAddress: Email.create(command.recipientAddress),
      templateName: command.templateName,
      payload: command.payload,
    };
  }

  static domainToResponse(notification: Notification): NotificationResponse {
    return new NotificationResponse(
      notification.id,
      notification. userId. getValue(),
      notification.notificationType.toString(),
      notification.channel.toString(),
      notification.recipientAddress.getValue(),
      notification.templateName,
      notification.status. toString(),
      notification.sentAt,
      notification.errorMessage,
      notification.retryCount,
      notification.createdAt
    );
  }

  static domainListToResponseList(notifications: Notification[]): NotificationResponse[] {
    return notifications.map(n => this.domainToResponse(n));
  }
}