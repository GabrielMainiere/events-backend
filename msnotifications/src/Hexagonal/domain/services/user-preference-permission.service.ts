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

  getBlockingReason(
    notificationType: NotificationType,
    channel: NotificationChannel,
    userPreference: UserPreferenceData | null
  ): string | null {
    if (this.canSendNotification(notificationType, channel, userPreference)) {
      return null;
    }

    if (! userPreference) {
      return 'Preference not found (should not happen - lazy creation expected)';
    }

    return `User disabled ${notificationType.toString()} notifications on ${channel.toString()} channel`;
  }
}