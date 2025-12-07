import { Logger } from '@nestjs/common';
import type { INotificationStrategy } from '../../../../../application/ports/output/notification-strategy.port';
import { NotificationChannel } from '../../../../../domain/enums/notification-channel.enum';

export class AuditLogDecorator implements INotificationStrategy {
  private readonly logger = new Logger(AuditLogDecorator.name);

  get channel(): NotificationChannel {
    return this.strategy.channel;
  }

  constructor(private readonly strategy: INotificationStrategy) {}

  async send(recipientAddress: string, subject: string, body: string): Promise<void> {
    const timestamp = new Date().toISOString();

    this.logger.log(
      `[AUDIT] ${timestamp} | Channel: ${this.channel} | To: ${recipientAddress} | Subject: ${subject}`
    );

    try {
      await this.strategy. send(recipientAddress, subject, body);

      this.logger.log(`[AUDIT] ${timestamp} | SUCCESS | To: ${recipientAddress}`);

    } catch (error) {
      this.logger.error(`[AUDIT] ${timestamp} | FAILED | To: ${recipientAddress} | Error: ${error. message}`);
      throw error;
    }
  }
}