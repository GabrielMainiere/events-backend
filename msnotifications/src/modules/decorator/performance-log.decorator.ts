import { Logger } from '@nestjs/common';
import { BaseNotificationDecorator } from './base-notification.decorator';
import { INotifier } from './interfaces/iNotifier';


export class PerformanceLogDecorator extends BaseNotificationDecorator {
  private readonly logger = new Logger(PerformanceLogDecorator.name);
  private readonly SLOW_THRESHOLD_MS = 5000;

  constructor(notifier: INotifier) {
    super(notifier);
  }

  async send(recipient: string, subject: string, body: string): Promise<void> {
    const startTime = Date.now();

    await this.notifier.send(recipient, subject, body);

    const duration = Date.now() - startTime;

    if (duration > this.SLOW_THRESHOLD_MS) {
      this.logger.warn(
        `[SLOW_PERFORMANCE] Envio lento detectado | ${JSON.stringify({
          recipient,
          duration: `${duration}ms`,
          threshold: `${this.SLOW_THRESHOLD_MS}ms`,
          timestamp: new Date().toISOString(),
        })}`,
      );
    } else {
      this.logger.debug(
        `[PERFORMANCE] Envio concluído | ${JSON.stringify({
          recipient,
          duration: `${duration}ms`,
        })}`,
      );
    }
  }
}