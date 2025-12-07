import { NotificationChannel } from "../../enums/notification-channel.enum";
import { NotificationType } from "../../enums/notification-type.enum";

export interface UserPreferenceData {
  userId: string;
  notificationType: NotificationType;
  channel: NotificationChannel;
  isEnabled: boolean;
}