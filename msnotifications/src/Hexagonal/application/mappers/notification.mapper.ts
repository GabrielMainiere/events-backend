import { Notification } from '../../domain/aggregates/notification.aggregate';
import { Email } from '../../domain/value-objects/email.vo';
import { ProcessNotificationCommand } from '../dtos/notifications/process-notification.command';
import { NotificationResponse } from '../dtos/notifications/notification.response';
import { CreateNotificationProps } from 'src/Hexagonal/domain/factories/types/notification.types';
import { Template } from 'src/Hexagonal/domain/entities/template.entity';

export class NotificationMapper {
  
  static commandWithTemplateToDomainProps(
    command: ProcessNotificationCommand,
    template: Template,
  ): CreateNotificationProps {
    return {
      userId: command.userId,
      notificationType: template.notificationType,
      channel: template.channel,
      recipientAddress: Email.create(command.recipientAddress),
      templateName: command.templateName,
      payload: command.payload,
    };
  }

  static domainToResponse(notification: Notification): NotificationResponse {
    return new NotificationResponse({
      id: notification.id,
      userId: notification.userId,
      notificationType: notification. notificationType,
      channel: notification.channel,
      recipientAddress: notification.recipientAddress. getValue(),
      templateName: notification. templateName,
      status: notification.status,
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