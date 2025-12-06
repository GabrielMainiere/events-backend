import { Logger } from '@nestjs/common';
import type { INotificationStrategy } from '../../../../../application/ports/output/notification-strategy.port';
import { NotificationChannel } from '../../../../../domain/enums/notification-channel.enum';

export class PerformanceLogDecorator implements INotificationStrategy {
  private readonly logger = new Logger(PerformanceLogDecorator.name);

  get channel(): NotificationChannel {
    return this.strategy.channel;
  }

  constructor(private readonly strategy: INotificationStrategy) {}

  async send(recipientAddress: string, subject: string, body: string): Promise<void> {
    const startTime = Date.now();

    try {
      await this.strategy.send(recipientAddress, subject, body);

      const duration = Date.now() - startTime;
      this.logger.log(`[PERFORMANCE] Send completed in ${duration}ms | Channel: ${this.channel} | To: ${recipientAddress}`);

    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger. error(`[PERFORMANCE] Send failed after ${duration}ms | Channel: ${this.channel} | To: ${recipientAddress}`);
      throw error;
    }
  }
}