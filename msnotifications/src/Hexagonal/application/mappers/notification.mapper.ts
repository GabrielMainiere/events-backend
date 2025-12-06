import { Notification } from '../../domain/aggregates/notification.aggregate';
import { CreateNotificationProps } from '../../domain/factories/types/notification.types';
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
    return new NotificationResponse({
      id: notification.id,
      userId: notification.userId. getValue(),
      notificationType: notification.notificationType.toString(),
      channel: notification.channel.toString(),
      recipientAddress: notification.recipientAddress.getValue(),
      templateName: notification. templateName,
      status: notification.status. toString(),
      sentAt: notification.sentAt,
      errorMessage: notification.errorMessage,
      retryCount: notification.retryCount,
      createdAt: notification.createdAt,
  });
  }

  static domainListToResponseList(notifications: Notification[]): NotificationResponse[] {
    return notifications.map(n => this.domainToResponse(n));
  }
}