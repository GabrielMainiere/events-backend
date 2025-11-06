import { SendAccountNotificationDto } from '../dto/send-account-notification.dto'
import { NotificationResponseDto } from '../dto/notification-response.dto'
import { Observable } from 'rxjs/internal/Observable'

export interface INotificationsClientService {
  sendVerificationNotification(
    data: SendAccountNotificationDto
  ): Promise<Observable<NotificationResponseDto>>

  sendWelcomeNotification(
    data: SendAccountNotificationDto
  ): Promise<Observable<NotificationResponseDto>>;
}
