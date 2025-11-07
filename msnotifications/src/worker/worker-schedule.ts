import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationLogRepository } from 'src/modules/notification-log/notification-log.repository';
import { WorkerLogger } from 'src/modules/logger/worker-logger';
import { NotificationBatchProcessor } from './notification-batch-processor';

@Injectable()
export class WorkerScheduler {
  constructor(
    private readonly notificationLogRepository: NotificationLogRepository,
    private readonly batchProcessor: NotificationBatchProcessor,
    private readonly workerLog: WorkerLogger,
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