import { Logger } from '@nestjs/common';
import type { INotificationStrategy } from '../../../../../application/ports/output/notification-strategy.port';
import { NotificationChannel } from '../../../../../domain/enums/notification-channel.enum';

export class RetryDecorator implements INotificationStrategy {
  private readonly logger = new Logger(RetryDecorator.name);

  get channel(): NotificationChannel {
    return this.strategy.channel;
  }

  constructor(
    private readonly strategy: INotificationStrategy,
    private readonly maxRetries: number = 3,
    private readonly delayMs: number = 1000,
  ) {}

  async send(recipientAddress: string, subject: string, body: string): Promise<void> {
    let attempt = 1;

    while (attempt <= this.maxRetries) {
      try {
        this.logger.log(`[RETRY] Attempt ${attempt}/${this.maxRetries} for ${recipientAddress}`);

        await this.strategy.send(recipientAddress, subject, body);

        this.logger.log(`[RETRY] Success on attempt ${attempt}`);
        return;

      } catch (error) {
        this.logger.error(`[RETRY] Failed attempt ${attempt}: ${error.message}`);

        if (attempt === this.maxRetries) {
          this.logger.error(`[RETRY] Max retries reached (${this.maxRetries}), giving up`);
          throw error;
        }

        this.logger.log(`[RETRY] Waiting ${this.delayMs}ms before next attempt...`);
        await this.sleep(this.delayMs);

        attempt++;
      }
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}