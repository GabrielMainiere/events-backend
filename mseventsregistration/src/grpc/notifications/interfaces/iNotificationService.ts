import { Observable } from 'rxjs/internal/Observable';
import { NotificationResponseDto } from '../dto/notification-response.dto';
import { SendEventNotificationDto } from '../dto/send-event-notification.dto';

export interface INotificationsClientService {
  sendEventNotification(
    data: SendEventNotificationDto
  ): Promise<Observable<NotificationResponseDto>>;
}