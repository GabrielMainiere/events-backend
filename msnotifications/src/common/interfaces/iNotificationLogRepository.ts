import { NotificationLog, NotificationStatus } from '@prisma/client';

export interface INotificationLogRepository {

  findPending(): Promise<NotificationLog[]>;

  updateStatus(
    id: string,
    status: NotificationStatus,
    error_message?: string,
  ): Promise<NotificationLog>;

  incrementRetryCount(id: string): Promise<NotificationLog>;
}