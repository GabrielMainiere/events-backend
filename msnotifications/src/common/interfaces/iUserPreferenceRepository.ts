import { UserPreference, NotificationType, NotificationChannel } from '@prisma/client';

export interface IUserPreferenceRepository {
  create(data: Partial<UserPreference>): Promise<UserPreference>;

  findUnique(
    userId: string,
    notificationType: NotificationType,
    channel: NotificationChannel,
  ): Promise<UserPreference | null>;
  
  findByUserIdAndTypes(
    userId: string,
    notificationTypes: NotificationType[],
  ): Promise<UserPreference[]>;
  
  upsert(
    userId: string,
    notificationType: NotificationType,
    channel: NotificationChannel,
    isEnabled: boolean,
  ): Promise<UserPreference>;
  
  deleteByUserId(userId: string): Promise<number>;
  
}