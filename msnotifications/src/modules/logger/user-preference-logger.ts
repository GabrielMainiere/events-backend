import { Injectable, Logger } from '@nestjs/common';
import { NotificationType, NotificationChannel } from '@prisma/client';

@Injectable()
export class UserPreferenceLogger {
  private readonly logger = new Logger(UserPreferenceLogger.name);

  logLazyCreation(userId: string, notificationType: NotificationType, channel: NotificationChannel): void {
    this.logger.log(
      `[PREFERENCE_LAZY_CREATION] Criando preferência padrão | ${JSON.stringify({
        user: userId,
        type: notificationType,
        channel,
        default: 'enabled',
      })}`,
    );
  }

  logBlockedAttempt(userId: string, notificationType: NotificationType): void {
    this.logger.warn(
      `[PREFERENCE_BLOCKED_ATTEMPT] Tentativa de desabilitar tipo obrigatório | ${JSON.stringify({
        user: userId,
        type: notificationType,
      })}`,
    );
  }

  logDeletion(userId: string): void {
    this.logger.log(
      `[PREFERENCE_DELETION] Deletando preferências do usuário | ${JSON.stringify({ user: userId })}`,
    );
  }

  logPreferenceUpdated(userId: string, notificationType: NotificationType, isEnabled: boolean): void {
    this.logger.log(
      `[PREFERENCE_UPDATED] Preferência atualizada | ${JSON.stringify({
        user: userId,
        type: notificationType,
        enabled: isEnabled,
      })}`,
    );
  }
}