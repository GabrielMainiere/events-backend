import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationBatchProcessor } from './notification-batch-processor';
import type{ INotificationLogRepository } from 'src/modules/notification-log/interfaces/iNotificationLogRepository';
import type{ IWorkerLogger } from 'src/modules/logger/interfaces/iLogger';

@Injectable()
export class WorkerScheduler {
  constructor(
    @Inject('INotificationLogRepository')
    private readonly notificationLogRepository: INotificationLogRepository,
    @Inject('IWorkerLogger')
    private readonly workerLog: IWorkerLogger,
    private readonly batchProcessor: NotificationBatchProcessor,

  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleScheduledJob(): Promise<void> {
    const pendingNotifications = await this.notificationLogRepository.findPending();

    if (pendingNotifications.length === 0) {
      return;
    }

    this.workerLog.logBatchStart(pendingNotifications.length);

    const results = await this.batchProcessor.process(pendingNotifications);

    this.workerLog.logBatchEnd(
      pendingNotifications.length,
      results.successCount,
      results.failureCount,
    );
  }
}