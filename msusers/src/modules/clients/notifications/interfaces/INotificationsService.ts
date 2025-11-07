import { SendAccountNotificationDto } from '../dto/send-account-notification.dto'
import { NotificationResponseDto } from '../dto/notification-response.dto'
import { Observable } from 'rxjs/internal/Observable'

export interface INotificationsClientService {
  sendAccountNotification(
    data: SendAccountNotificationDto
  ): Promise<Observable<NotificationResponseDto>>

}
