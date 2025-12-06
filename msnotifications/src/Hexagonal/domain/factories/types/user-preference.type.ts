import { NotificationChannel } from "../../enums/notification-channel.enum";
import { NotificationType } from "../../enums/notification-type.enum";

export interface CreateUserPreferenceProps {
  userId: string;
  notificationType: NotificationType;
  channel: NotificationChannel;
  isEnabled?: boolean;
}
export interface UserPreferenceProps {
  id: string;
  userId: string;
  notificationType: NotificationType;
  channel: NotificationChannel;
  isEnabled: boolean;
  updatedAt: Date;
}
