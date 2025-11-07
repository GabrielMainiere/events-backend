import { Observable } from 'rxjs/internal/Observable';
import { NotificationResponseDto } from '../dto/notification-response.dto';
import { SendRegistrationNotificationDto } from '../dto/send-registration-notification.dto';

export interface INotificationsClientService {
  sendEventRegistrationNotification(
    data: SendRegistrationNotificationDto
  ): Promise<Observable<NotificationResponseDto>>;

  sendEventWaitingPaymentNotification(
    data: SendRegistrationNotificationDto
  ): Promise<Observable<NotificationResponseDto>>;

  sendEventCancellationNotification(
    data: SendRegistrationNotificationDto
  ): Promise<Observable<NotificationResponseDto>>;
}