import { Injectable } from '@nestjs/common';
import { NotificationType, NotificationChannel, UserPreference } from '@prisma/client';
import { UserPreferenceRepository } from './user-preference.repository';
import { UserPreferenceLogger } from '../logger/user-preference-logger';

@Injectable()
export class UserPreferenceLazy {
  constructor(
    private readonly repository: UserPreferenceRepository,
    private readonly preferenceLog: UserPreferenceLogger,
  ) {}

  async getOrCreate(
    user_id: string,
    notification_type: NotificationType,
    channel: NotificationChannel,
  ): Promise<UserPreference> {
    let preference = await this.repository.findUnique(
      user_id,
      notification_type,
      channel,
    );

    if (!preference) {
      this.preferenceLog.logLazyCreation(user_id, notification_type, channel);
      preference = await this.createDefault(user_id, notification_type, channel);
    }

    return preference;
  }

  private async createDefault(
    user_id: string,
    notification_type: NotificationType,
    channel: NotificationChannel,
  ): Promise<UserPreference> {
    return this.repository.create(
      user_id,
      notification_type,
      channel,
      false,
    );
  }
}