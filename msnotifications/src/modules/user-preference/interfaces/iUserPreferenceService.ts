import {
  UserPreference,
  NotificationType,
  NotificationChannel,
} from '@prisma/client';
import { UpsertUserPreferenceInput } from 'src/common/dto/upsertUserPreference.input';

export interface IUserPreferenceService {
  upsert(data: UpsertUserPreferenceInput): Promise<UserPreference>;

  canSendNotification(
    user_id: string,
    notification_type: NotificationType,
    channel: NotificationChannel,
  ): Promise<boolean>;

  findOptionalPreferences(user_id: string): Promise<UserPreference[]>;

  deleteByUserId(user_id: string): Promise<void>;
}