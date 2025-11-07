import { Logger } from '@nestjs/common';
import { BaseNotificationDecorator } from './base-notification.decorator';
import { INotificationStrategy } from 'src/common/interfaces/iNotificationStategy';

export class AuditLogDecorator extends BaseNotificationDecorator {
  private readonly logger = new Logger(AuditLogDecorator.name);

  constructor(strategy: INotificationStrategy) {
    super(strategy);
  }

  async send(recipient: string, subject: string, body: string): Promise<void> {
    this.logStart(recipient, subject);

    try {
      await this.strategy.send(recipient, subject, body);
      this.logSuccess(recipient);
    } catch (error) {
      this.logError(recipient, error);
      throw error;
    }
  }

  private logStart(recipient: string, subject: string): void {
    this.logger.log(
      `[SEND_START] Iniciando envio | ${JSON.stringify({
        recipient,
        subject,
        timestamp: new Date().toISOString(),
      })}`,
    );
  }

  private logSuccess(recipient: string): void {
    this.logger.log(
      `[SEND_SUCCESS] Notificação enviada com sucesso | ${JSON.stringify({
        recipient,
        status: 'delivered',
        timestamp: new Date().toISOString(),
      })}`,
    );
  }

  private logError(recipient: string, error: Error): void {
    this.logger.error(
      `[SEND_ERROR] Falha no envio | ${JSON.stringify({
        recipient,
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      })}`,
    );
  }
}