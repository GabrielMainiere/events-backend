import { Logger } from '@nestjs/common';
import { BaseNotificationDecorator } from './base-notification.decorator';
import { INotificationStrategy } from '../strategy/interfaces/iNotificationStrategy';

export class RetryDecorator extends BaseNotificationDecorator {
  private readonly logger = new Logger(RetryDecorator.name);

  constructor(
    strategy: INotificationStrategy,
    private readonly maxRetries: number = 3,
    private readonly retryDelayMs: number = 1000,
  ) {
    super(strategy);
  }

  async send(recipient: string, subject: string, body: string): Promise<void> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        await this.strategy.send(recipient, subject, body);
        
        if (attempt > 1) {
          this.logger.log(
            `[RETRY_SUCCESS] Envio bem-sucedido na tentativa ${attempt} | Recipient: ${recipient}`,
          );
        }
        
        return;
      } catch (error) {
        lastError = error;
        
        this.logger.warn(
          `[RETRY_ATTEMPT] Tentativa ${attempt}/${this.maxRetries} falhou | Recipient: ${recipient} | Error: ${error.message}`,
        );

        if (attempt < this.maxRetries) {
          await this.sleep(this.retryDelayMs * attempt);
        }
      }
    }

    this.logger.error(
      `[RETRY_FAILED] Todas as ${this.maxRetries} tentativas falharam | Recipient: ${recipient}`,
    );
    
    throw lastError;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}