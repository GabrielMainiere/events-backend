import { NotificationType } from '../enums/notification-type.enum';
import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationTypeHelper } from '../helper/notification-type.helper';
import { UserPreferenceData } from './interface/user-preference-permission.interface';

export class UserPreferencePermissionService {

  canSendNotification(
    notificationType: NotificationType,
    channel: NotificationChannel,
    userPreference: UserPreferenceData | null
  ): boolean {
    if (NotificationTypeHelper.isMandatory(notificationType)) {
      return true;
    }

    if (!userPreference) {
      return true;
    }

    return userPreference.isEnabled;
  }

  validateCanDisableNotification(
    notificationType: NotificationType,
    isEnabled: boolean
  ): void {
    if (! isEnabled && NotificationTypeHelper.isMandatory(notificationType)) {
      throw new Error(
        `Cannot disable mandatory notification type: "${notificationType}".  ` +
          `Mandatory types (ACCOUNT, PAYMENTS) cannot be disabled by users.`
      );
    }
  }
}