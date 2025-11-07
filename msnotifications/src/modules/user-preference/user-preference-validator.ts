import { Injectable, BadRequestException } from '@nestjs/common';
import { UpsertUserPreferenceInput } from 'src/common/dto/upsertUserPreference.input';
import { NotificationTypeHelper } from 'src/common/helper/notification-type.helper';
import { NotificationType } from '@prisma/client';
import { UserPreferenceLogger } from '../logger/user-preference-logger';

@Injectable()
export class UserPreferenceValidator {
  constructor(
    private readonly preferenceLog: UserPreferenceLogger,
  ) {}

  validateUpsert(data: UpsertUserPreferenceInput): void {
    if (!data.is_enabled && this.isMandatoryType(data.notification_type)) {
      this.preferenceLog.logBlockedAttempt(data.user_id, data.notification_type);
      throw new BadRequestException(
        `Notifications of type "${data.notification_type}" are mandatory and cannot be disabled.`,
      );
    }
  }

  isMandatoryType(notificationType: NotificationType): boolean {
    return NotificationTypeHelper.isMandatory(notificationType);
  }

  isOptionalType(notificationType: NotificationType): boolean {
    return NotificationTypeHelper.isOptional(notificationType);
  }

  getOptionalTypes(): NotificationType[] {
    return NotificationTypeHelper.getOptionalTypes();
  }

  getMandatoryTypes(): NotificationType[] {
    return NotificationTypeHelper.getMandatoryTypes();
  }
}