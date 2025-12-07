import { NotificationChannel } from "../../enums/notification-channel.enum";
import { NotificationType } from "../../enums/notification-type.enum";

export interface CreateTemplateProps {
  templateName: string;
  notificationType: NotificationType;
  channel: NotificationChannel;
  subjectTemplate: string;
  bodyTemplate: string;
}
export interface TemplateProps {
  id: string;
  templateName: string;
  notificationType: NotificationType;
  channel: NotificationChannel;
  subjectTemplate: string;
  bodyTemplate: string;
  createdAt: Date;
  updatedAt: Date;
}