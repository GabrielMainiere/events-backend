import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationLog, NotificationStatus } from '@prisma/client';
import { NotificationFactory } from 'src/modules/factory/notification.factory';
import { NotificationLogRepository } from 'src/modules/notification-log/notification-log.repository';


@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);

  constructor(
    private readonly notificationLogRepository: NotificationLogRepository,
    private readonly notificationFactory: NotificationFactory,
  ) {}


  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const pendingNotifications = await this.notificationLogRepository.findPending();

    if (this.hasNoPendingNotifications(pendingNotifications)) {
      return;
    }

    this.logBatchStart(pendingNotifications.length);

    await this.processBatch(pendingNotifications);
  }

  private hasNoPendingNotifications(notifications: NotificationLog[]): boolean {
    return notifications.length === 0;
  }

  private logBatchStart(count: number): void {
    this.logger.log(
      `[WORKER] Processando lote | ${JSON.stringify({ count })}`,
    );
  }

  private async processBatch(notifications: NotificationLog[]): Promise<void> {
    for (const notification of notifications) {
      await this.processNotification(notification);
    }
  }

  private async processNotification(notification: NotificationLog): Promise<void> {
    await this.markAsProcessing(notification.id);

    try {
      await this.sendNotification(notification);
      await this.markAsSuccess(notification.id);
    } catch (error) {
      await this.handleFailure(notification.id, error);
    }
  }

  private async markAsProcessing(notificationId: string): Promise<void> {
    await this.notificationLogRepository.updateStatus(
      notificationId,
      NotificationStatus.PROCESSANDO,
    );
  }

  private async sendNotification(notification: NotificationLog): Promise<void> {
    const strategy = this.notificationFactory.getStrategy(notification.channel);
    await strategy.send(notification);
  }

  private async markAsSuccess(notificationId: string): Promise<void> {
    await this.notificationLogRepository.updateStatus(
      notificationId,
      NotificationStatus.ENVIADO,
    );
  }

  private async handleFailure(
    notificationId: string,
    error: Error,
  ): Promise<void> {
    await this.notificationLogRepository.updateStatus(
      notificationId,
      NotificationStatus.FALHA,
      error.message,
    );

    await this.notificationLogRepository.incrementRetryCount(notificationId);
  }
}