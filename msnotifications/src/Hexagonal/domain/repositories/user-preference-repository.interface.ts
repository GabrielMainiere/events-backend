import { UserPreference } from "../entities/user-preference.entity";
import { NotificationChannel } from "../enums/notification-channel.enum";
import { NotificationType } from "../enums/notification-type.enum";

export interface IUserPreferenceRepository {

  save(preference: UserPreference): Promise<void>;
  findById(id: string): Promise<UserPreference | null>;
  findByUserAndTypeAndChannel(
    userId: string,
    notificationType: NotificationType,
    channel: NotificationChannel,
  ): Promise<UserPreference | null>;
  findByUserId(userId: string): Promise<UserPreference[]>;
  findAll(): Promise<UserPreference[]>;
  delete(id: string): Promise<void>;
}