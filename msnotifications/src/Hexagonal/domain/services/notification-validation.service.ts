import { NotificationType } from '../value-objects/notification-type.vo';
import { NotificationChannel } from '../value-objects/notification-channel.vo';

export class NotificationValidationService {
  
  isMandatoryNotificationType(type: NotificationType): boolean {
    return type. isMandatory();
  }

  isOptionalNotificationType(type: NotificationType): boolean {
    return type.isOptional();
  }

  getMandatoryTypes(): NotificationType[] {
    return NotificationType.getMandatoryTypes();
  }

  getOptionalTypes(): NotificationType[] {
    return NotificationType.getOptionalTypes();
  }

  isChannelCompatibleWithType(
    channel: NotificationChannel, 
    type: NotificationType
  ): boolean {
    return true;
  }
}