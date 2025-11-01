import { Injectable, Logger } from '@nestjs/common';
import { NotificationLog } from '@prisma/client';
import { BaseNotificationDecorator } from './base-notification.decorator';


@Injectable()
export class AuditLogDecorator extends BaseNotificationDecorator {
  private readonly logger = new Logger(AuditLogDecorator.name);

  async send(notification: NotificationLog): Promise<void> {
    if (!this.strategy) {
      throw new Error('Strategy não definida no Decorator');
    }

    this.logStart(notification);

    try {
      await this.strategy.send(notification);
      this.logSuccess(notification);
    } catch (error) {
      this.logError(notification, error);
      throw error;
    }
  }

  private logStart(notification: NotificationLog): void {
    this.logger.log(
      `[SEND_START] Iniciando envio | ${JSON.stringify({
        id: notification.id,
        type: notification.notification_type,
        channel: notification.channel,
        user: notification.user_id,
        recipient: notification.recipient_address,
      })}`,
    );
  }

  private logSuccess(notification: NotificationLog): void {
    this.logger.log(
      `[SEND_SUCCESS] Notificação enviada com sucesso | ${JSON.stringify({
        id: notification.id,
        status: 'delivered',
      })}`,
    );
  }

  private logError(notification: NotificationLog, error: Error): void {
    this.logger.error(
      `[SEND_ERROR] Falha no envio | ${JSON.stringify({
        id: notification.id,
        error: error.message,
        stack: error.stack,
      })}`,
    );
  }
}