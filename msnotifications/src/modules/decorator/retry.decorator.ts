import { Logger } from '@nestjs/common';
import { BaseNotificationDecorator } from './base-notification.decorator';
import { INotifier } from './interfaces/iNotifier';


export class RetryDecorator extends BaseNotificationDecorator {
  private readonly logger = new Logger(RetryDecorator.name);

  constructor(
    notifier: INotifier,
    private readonly maxRetries: number = 3,
    private readonly retryDelayMs: number = 1000,
  ) {
    super(notifier);
  }

  async send(recipient: string, subject: string, body: string): Promise<void> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        await this.notifier.send(recipient, subject, body);
        
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