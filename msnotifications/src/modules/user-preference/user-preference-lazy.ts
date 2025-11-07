import { Injectable, Inject } from '@nestjs/common';
import { NotificationType, NotificationChannel, UserPreference } from '@prisma/client';
import type{ IUserPreferenceRepository } from 'src/common/interfaces/iUserPreferenceRepository';
import { UserPreferenceLogger } from '../logger/user-preference-logger';

@Injectable()
export class UserPreferenceLazy {
  constructor(
    @Inject('IUserPreferenceRepository')
    private readonly repository: IUserPreferenceRepository,
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
    return this.repository.create({
      user_id,
      notification_type,
      channel,
      is_enabled: true,
    });
  }
}