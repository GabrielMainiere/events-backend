import { Injectable, BadRequestException } from '@nestjs/common';
import { UpsertUserPreferenceInput } from 'src/common/dto/upsertUserPreference.input';
import { NotificationTypeHelper } from 'src/common/helper/notification-type.helper';
import { NotificationType } from '@prisma/client';
import { UserPreferenceLogDecorator } from '../decorator/user-preference-log.decorator';

@Injectable()
export class UserPreferenceValidator {
  constructor(
    private readonly preferenceLog: UserPreferenceLogDecorator,
  ) {}

  validateUpsert(data: UpsertUserPreferenceInput): void {
    if (!data.is_enabled && this.isMandatoryType(data.notification_type)) {
      this.preferenceLog.logBlockedAttempt(data.user_id, data.notification_type);
      throw new BadRequestException(
        `Notificações do tipo "${data.notification_type}" são obrigatórias e não podem ser desabilitadas.`,
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