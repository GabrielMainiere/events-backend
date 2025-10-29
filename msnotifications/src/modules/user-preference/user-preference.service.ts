import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { UpsertUserPreferenceInput } from 'src/dto/upsertUserPreference.input';
import { NotificationTypeHelper } from 'src/helper/notification-type.helper';
import { NotificationType, NotificationChannel, UserPreference } from '@prisma/client';
import { UserPreferenceRepository } from './user-preference.repository';

@Injectable()
export class UserPreferenceService {
  private readonly logger = new Logger(UserPreferenceService.name);

  constructor(
    private readonly repository: UserPreferenceRepository,
  ) {}

  async upsert(data: UpsertUserPreferenceInput) {
    this.validateNotDisablingMandatoryType(data);
    return this.repository.upsert(data);
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

  async findOptionalPreferences(user_id: string) {
    const optionalTypes = NotificationTypeHelper.getOptionalTypes();
    return this.repository.findByUserIdAndTypes(user_id, optionalTypes);
  }

  async deleteByUserId(user_id: string) {
    this.logDeletion(user_id);
    return this.repository.deleteByUserId(user_id);
  }

  private validateNotDisablingMandatoryType(data: UpsertUserPreferenceInput): void {
    if (this.isAttemptingToDisableMandatory(data)) {
      this.logBlockedAttempt(data);
      throw new BadRequestException(
        `Notificações do tipo "${data.notification_type}" são obrigatórias e não podem ser desabilitadas.`,
      );
    }
  }

  private isAttemptingToDisableMandatory(data: UpsertUserPreferenceInput): boolean {
    return !data.is_enabled && NotificationTypeHelper.isMandatory(data.notification_type);
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
      this.logLazyCreation(user_id, notification_type, channel);
      preference = await this.createDefaultPreference(
        user_id,
        notification_type,
        channel,
      );
    }

    return preference;
  }

  private async createDefaultPreference(
    user_id: string,
    notification_type: NotificationType,
    channel: NotificationChannel,
  ): Promise<UserPreference> {
    return this.repository.create(
      user_id,
      notification_type,
      channel,
      true,
    );
  }

  private logBlockedAttempt(data: UpsertUserPreferenceInput): void {
    this.logger.warn(
      `[BLOCKED] Tentativa de desabilitar tipo obrigatório | ${JSON.stringify({
        user: data.user_id,
        type: data.notification_type,
      })}`,
    );
  }

  private logLazyCreation(
    user_id: string,
    notification_type: NotificationType,
    channel: NotificationChannel,
  ): void {
    this.logger.log(
      `[LAZY_CREATION] Criando preferência | ${JSON.stringify({
        user: user_id,
        type: notification_type,
        channel,
        default: 'enabled',
      })}`,
    );
  }

  private logDeletion(user_id: string): void {
    this.logger.log(
      `[DELETE] Deletando preferências | ${JSON.stringify({ user: user_id })}`,
    );
  }
}