import { NotificationResponse } from "src/Hexagonal/application/dtos/notifications/notification.response";
import { ProcessNotificationCommand } from "src/Hexagonal/application/dtos/notifications/process-notification.command";

export interface IProcessNotification {
  execute(command: ProcessNotificationCommand): Promise<NotificationResponse>;
}