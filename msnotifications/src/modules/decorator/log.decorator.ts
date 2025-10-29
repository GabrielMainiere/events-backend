import { Injectable, Logger } from '@nestjs/common';
import { NotificationLog } from '@prisma/client';
import { INotificationStrategy } from 'src/interfaces/iNotificationStategy';

@Injectable()
export class LogNotificationDecorator implements INotificationStrategy {
  private readonly logger = new Logger(LogNotificationDecorator.name);
  private readonly SLOW_THRESHOLD_MS = 5000;

  private strategy: INotificationStrategy;

  public setStrategy(strategy: INotificationStrategy): void {
    this.strategy = strategy;
  }

  async send(notification: NotificationLog): Promise<void> {
    if (!this.strategy) {
      throw new Error('Strategy não definida no Decorator');
    }

    const startTime = Date.now();

    this.logger.log(
      `[START] Enviando notificação | ${JSON.stringify({
        id: notification.id,
        type: notification.notification_type,
        channel: notification.channel,
        user: notification.user_id,
        recipient: notification.recipient_address,
      })}`,
    );

    try {
      await this.strategy.send(notification);

      const duration = Date.now() - startTime;

      this.logger.log(
        `[SUCCESS] Notificação enviada | ${JSON.stringify({
          id: notification.id,
          duration: `${duration}ms`,
          status: 'delivered',
        })}`,
      );

      if (duration > this.SLOW_THRESHOLD_MS) {
        this.logger.warn(
          `[SLOW] Envio lento detectado | ${JSON.stringify({
            id: notification.id,
            duration: `${duration}ms`,
            threshold: `${this.SLOW_THRESHOLD_MS}ms`,
          })}`,
        );
      }
    } catch (error) {
      const duration = Date.now() - startTime;

      this.logger.error(
        `[ERROR] Falha no envio | ${JSON.stringify({
          id: notification.id,
          duration: `${duration}ms`,
          error: error.message,
        })}`,
      );
      throw error;
    }
  }
}