import { NotificationLog, NotificationStatus } from '@prisma/client';

export interface INotificationLogRepository {
  findById(id: string): Promise<NotificationLog | null>;
  create(data: Partial<NotificationLog>): Promise<NotificationLog>;

  findPending(): Promise<NotificationLog[]>;
  findByUserId(userId: string): Promise<NotificationLog[]>;
  findByStatus(status: NotificationStatus): Promise<NotificationLog[]>;
  
  updateStatus(
    id: string,
    status: NotificationStatus,
    errorMessage?: string,
  ): Promise<NotificationLog>;
  incrementRetryCount(id: string): Promise<NotificationLog>;
}