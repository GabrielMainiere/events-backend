import { SendVerificationNotificationDto } from '../dto/send-verification-notification.dto'
import { NotificationResponseDto } from '../dto/notification-response.dto'
import { Observable } from 'rxjs/internal/Observable'

export interface INotificationsClientService {
  sendVerificationNotification(
    data: SendVerificationNotificationDto
  ): Promise<Observable<NotificationResponseDto>>
}
