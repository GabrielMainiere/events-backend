// src/modules/user-preference/user-preference.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { UpsertUserPreferenceInput } from 'src/dto/upsertUserPreference.input';
import { NotificationTypeHelper } from 'src/helper/notification-type.helper';
import { NotificationType, NotificationChannel, UserPreference } from '@prisma/client';
import { UserPreferenceRepository } from './user-preference.repository';
import { UserPreferenceLogDecorator } from '../decorator/user-preference-log.decorator';

@Injectable()
export class UserPreferenceService {
  constructor(
    private readonly repository: UserPreferenceRepository,
    private readonly preferenceLog: UserPreferenceLogDecorator,
  ) {}

  async upsert(data: UpsertUserPreferenceInput): Promise<UserPreference> {
    this.validateNotDisablingMandatoryType(data);
    
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
    if (NotificationTypeHelper.isMandatory(notification_type)) {
      return true;
    }

    const preference = await this.getOrCreatePreference(
      user_id,
      notification_type,
      channel,
    );

    return preference.is_enabled;
  }

  async findOptionalPreferences(user_id: string): Promise<UserPreference[]> {
    const optionalTypes = NotificationTypeHelper.getOptionalTypes();
    return this.repository.findByUserIdAndTypes(user_id, optionalTypes);
  }

  async deleteByUserId(user_id: string): Promise<void> {
    this.preferenceLog.logDeletion(user_id);
    await this.repository.deleteByUserId(user_id);
  }

  private validateNotDisablingMandatoryType(data: UpsertUserPreferenceInput): void {
    if (!data.is_enabled && NotificationTypeHelper.isMandatory(data.notification_type)) {
      this.preferenceLog.logBlockedAttempt(data.user_id, data.notification_type);
      throw new BadRequestException(
        `Notificações do tipo "${data.notification_type}" são obrigatórias e não podem ser desabilitadas.`,
      );
    }
  }

  private async getOrCreatePreference(
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
      preference = await this.repository.create(
        user_id,
        notification_type,
        channel,
        true,
      );
    }

    return preference;
  }
}