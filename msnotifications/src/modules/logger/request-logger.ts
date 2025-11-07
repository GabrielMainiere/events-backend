import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RequestLogger {
  private readonly logger = new Logger(RequestLogger.name);

  logRequestReceived(method: string, data: { userId: string; recipientAddress: string }): void {
    this.logger.log(
      `[REQUEST_RECEIVED] Método: ${method} | ${JSON.stringify(data)}`,
    );
  }

  logTemplateNotFound(templateName: string): void {
    this.logger.error(
      `[TEMPLATE_NOT_FOUND] Template não encontrado | ${JSON.stringify({ templateName })}`,
    );
  }

  logUserBlocked(userId: string, notificationType: string): void {
    this.logger.warn(
      `[USER_BLOCKED] Usuário bloqueou notificação | ${JSON.stringify({
        userId,
        type: notificationType,
      })}`,
    );
  }

  logNotificationEnqueued(notificationId: string, templateName: string): void {
    this.logger.log(
      `[NOTIFICATION_ENQUEUED] Notificação enfileirada | ${JSON.stringify({
        id: notificationId,
        template: templateName,
      })}`,
    );
  }

  logInvalidPayload(error: string): void {
    this.logger.error(
      `[INVALID_PAYLOAD] Payload JSON inválido | ${JSON.stringify({ error })}`,
    );
  }
}