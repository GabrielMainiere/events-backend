import { NotificationType } from '../value-objects/notification-type.vo';
import { NotificationChannel } from '../value-objects/notification-channel.vo';

export interface UserPreferenceData {
  userId: string;
  notificationType: string;
  channel: string;
  isEnabled: boolean;
}

export class UserPreferencePermissionService {

  canSendNotification(
    notificationType: NotificationType,
    channel: NotificationChannel,
    userPreference: UserPreferenceData | null
  ): boolean {
    if (notificationType.isMandatory()) {
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
    if (! isEnabled && notificationType.isMandatory()) {
      throw new Error(
        `Cannot disable mandatory notification type: "${notificationType.toString()}". ` +
        `Mandatory types (ACCOUNT, PAYMENTS) cannot be disabled by users.`
      );
    }
  }
}