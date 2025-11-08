import { Injectable } from '@nestjs/common';
import { NotificationType, NotificationChannel } from '@prisma/client';
import { UserPreferenceValidator } from './validator/user-preference-validator';
import { UserPreferenceLazy } from './user-preference-lazy';

@Injectable()
export class UserPreferencePermissionChecker {
  constructor(
    private readonly validator: UserPreferenceValidator,
    private readonly preferenceLazy: UserPreferenceLazy,
  ) {}

  async canSend(
    user_id: string,
    notification_type: NotificationType,
    channel: NotificationChannel,
  ): Promise<boolean> {
    if (this.validator.isMandatoryType(notification_type)) {
      return true;
    }

    const preference = await this.preferenceLazy.getOrCreate(
      user_id,
      notification_type,
      channel,
    );

    return preference.is_enabled;
  }
}