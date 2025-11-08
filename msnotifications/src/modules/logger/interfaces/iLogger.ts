import { NotificationType, NotificationChannel } from '@prisma/client';

export interface IRequestLogger {
  logRequestReceived(
    method: string,
    data: { userId: string; recipientAddress: string },
  ): void;
  logTemplateNotFound(templateName: string): void;
  logUserBlocked(userId: string, notificationType: string): void;
  logNotificationEnqueued(notificationId: string, templateName: string): void;
  logInvalidPayload(error: string): void;
}

export interface IUserPreferenceLogger {
  logLazyCreation(
    userId: string,
    notificationType: NotificationType,
    channel: NotificationChannel,
  ): void;
  logBlockedAttempt(userId: string, notificationType: NotificationType): void;
  logDeletion(userId: string): void;
  logPreferenceUpdated(
    userId: string,
    notificationType: NotificationType,
    isEnabled: boolean,
  ): void;
}

export interface IWorkerLogger {
  logBatchStart(count: number): void;
  logBatchEnd(
    count: number,
    successCount: number,
    failureCount: number,
  ): void;
  logNotificationProcessing(notificationId: string): void;
  logNotificationSuccess(notificationId: string): void;
  logNotificationFailure(notificationId: string, error: Error): void;
}