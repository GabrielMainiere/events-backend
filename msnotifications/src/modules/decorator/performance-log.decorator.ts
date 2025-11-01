import { Injectable, Logger } from '@nestjs/common';
import { NotificationLog } from '@prisma/client';import { BaseNotificationDecorator } from './base-notification.decorator';
;

@Injectable()
export class PerformanceLogDecorator extends BaseNotificationDecorator {
  private readonly logger = new Logger(PerformanceLogDecorator.name);
  private readonly SLOW_THRESHOLD_MS = 5000;

  async send(notification: NotificationLog): Promise<void> {
    if (!this.strategy) {
      throw new Error('Strategy não definida no Decorator');
    }

    const startTime = Date.now();

    await this.strategy.send(notification);

    const duration = Date.now() - startTime;

    if (duration > this.SLOW_THRESHOLD_MS) {
      this.logger.warn(
        `[SLOW_PERFORMANCE] Envio lento detectado | ${JSON.stringify({
          id: notification.id,
          duration: `${duration}ms`,
          threshold: `${this.SLOW_THRESHOLD_MS}ms`,
          channel: notification.channel,
        })}`,
      );
    }
  }
}