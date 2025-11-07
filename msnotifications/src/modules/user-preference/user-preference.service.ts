import { Injectable } from '@nestjs/common';
import { UpsertUserPreferenceInput } from 'src/common/dto/upsertUserPreference.input';
import { NotificationType, NotificationChannel, UserPreference } from '@prisma/client';
import { UserPreferenceRepository } from './user-preference.repository';

import { UserPreferenceLogger } from '../logger/user-preference-logger';
import { UserPreferenceValidator } from './user-preference-validator';
import { UserPreferencePermissionChecker } from './user-preference-permission-checker';
import { UserPreferenceLazy } from './user-preference-lazy';

@Injectable()
export class UserPreferenceService {
  constructor(
    private readonly repository: UserPreferenceRepository,
    private readonly validator: UserPreferenceValidator,
    private readonly permissionChecker: UserPreferencePermissionChecker,
    private readonly preferenceLazy: UserPreferenceLazy,
    private readonly preferenceLog: UserPreferenceLogger,
  ) {}

  async upsert(data: UpsertUserPreferenceInput): Promise<UserPreference> {
    this.validator.validateUpsert(data);
    
    const preference = await this.repository.upsert(data);
    
    this.preferenceLog.logPreferenceUpdated(
      data.user_id,
      data.notification_type,
      data.is_enabled,
    );
    
    return preference;
  }

  async canSendNotification(
    user_id: string,
    notification_type: NotificationType,
    channel: NotificationChannel,
  ): Promise<boolean> {
    return this.permissionChecker.canSend(user_id, notification_type, channel);
  }

  async findOptionalPreferences(user_id: string): Promise<UserPreference[]> {
    return this.repository.findByUserIdAndTypes(
      user_id,
      this.validator.getOptionalTypes(),
    );
  }

  async deleteByUserId(user_id: string): Promise<void> {
    this.preferenceLog.logDeletion(user_id);
    await this.repository.deleteByUserId(user_id);
  }
}