import { Injectable } from '@nestjs/common';
import { NotificationStatus } from '@prisma/client';
import { NotificationLogRepository } from 'src/modules/notification-log/notification-log.repository';

@Injectable()
export class NotificationStatusUpdater {
  constructor(
    private readonly notificationLogRepository: NotificationLogRepository,
  ) {}

  async markAsProcessing(notificationId: string): Promise<void> {
    await this.notificationLogRepository.updateStatus(
      notificationId,
      NotificationStatus.PROCESSANDO,
    );
  }

  async markAsSuccess(notificationId: string): Promise<void> {
    await this.notificationLogRepository.updateStatus(
      notificationId,
      NotificationStatus.ENVIADO,
    );
  }

  async markAsFailure(notificationId: string, errorMessage: string): Promise<void> {
    await this.notificationLogRepository.updateStatus(
      notificationId,
      NotificationStatus.FALHA,
      errorMessage,
    );

    await this.notificationLogRepository.incrementRetryCount(notificationId);
  }
}