import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WorkerLogDecorator {
  private readonly logger = new Logger(WorkerLogDecorator.name);

  logBatchStart(count: number): void {
    this.logger.log(
      `[WORKER_BATCH_START] Processando lote de notificações | ${JSON.stringify({ count })}`,
    );
  }

  logBatchEnd(count: number, successCount: number, failureCount: number): void {
    this.logger.log(
      `[WORKER_BATCH_END] Lote processado | ${JSON.stringify({
        total: count,
        success: successCount,
        failures: failureCount,
      })}`,
    );
  }

  logNotificationProcessing(notificationId: string): void {
    this.logger.debug(
      `[WORKER_PROCESSING] Processando notificação | ${JSON.stringify({ id: notificationId })}`,
    );
  }

  logNotificationSuccess(notificationId: string): void {
    this.logger.log(
      `[WORKER_SUCCESS] Notificação processada | ${JSON.stringify({ id: notificationId })}`,
    );
  }

  logNotificationFailure(notificationId: string, error: Error): void {
    this.logger.error(
      `[WORKER_FAILURE] Falha ao processar | ${JSON.stringify({
        id: notificationId,
        error: error.message,
      })}`,
    );
  }
}