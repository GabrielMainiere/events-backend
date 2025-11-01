// src/worker/worker.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationLog, NotificationStatus } from '@prisma/client';
import { NotificationFactory } from 'src/modules/factory/notification.factory';
import { NotificationLogRepository } from 'src/modules/notification-log/notification-log.repository';
import { WorkerLogDecorator } from 'src/modules/decorator/worker-log.decorator';

@Injectable()
export class WorkerService {
  constructor(
    private readonly notificationLogRepository: NotificationLogRepository,
    private readonly notificationFactory: NotificationFactory,
    private readonly workerLog: WorkerLogDecorator,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron(): Promise<void> {
    const pendingNotifications = await this.notificationLogRepository.findPending();

    if (pendingNotifications.length === 0) {
      return;
    }

    this.workerLog.logBatchStart(pendingNotifications.length);

    const results = await this.processBatch(pendingNotifications);

    this.workerLog.logBatchEnd(
      pendingNotifications.length,
      results.successCount,
      results.failureCount,
    );
  }

  private async processBatch(notifications: NotificationLog[]): Promise<{
    successCount: number;
    failureCount: number;
  }> {
    let successCount = 0;
    let failureCount = 0;

    for (const notification of notifications) {
      const success = await this.processNotification(notification);
      if (success) {
        successCount++;
      } else {
        failureCount++;
      }
    }

    return { successCount, failureCount };
  }

  private async processNotification(notification: NotificationLog): Promise<boolean> {
    this.workerLog.logNotificationProcessing(notification.id);

    await this.notificationLogRepository.updateStatus(
      notification.id,
      NotificationStatus.PROCESSANDO,
    );

    try {
      const strategy = this.notificationFactory.getStrategy(notification.channel);
      await strategy.send(notification);

      await this.notificationLogRepository.updateStatus(
        notification.id,
        NotificationStatus.ENVIADO,
      );

      this.workerLog.logNotificationSuccess(notification.id);
      return true;
    } catch (error) {
      await this.notificationLogRepository.updateStatus(
        notification.id,
        NotificationStatus.FALHA,
        error.message,
      );

      await this.notificationLogRepository.incrementRetryCount(notification.id);

      this.workerLog.logNotificationFailure(notification.id, error);
      return false;
    }
  }
}