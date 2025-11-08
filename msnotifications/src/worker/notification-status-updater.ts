import { Inject, Injectable } from '@nestjs/common';
import { NotificationStatus } from '@prisma/client';
import { INotificationStatusUpdater } from './interfaces/iNotificationStatusUpdater';
import type { INotificationLogRepository } from 'src/modules/notification-log/interfaces/iNotificationLogRepository';

@Injectable()
export class NotificationStatusUpdater implements INotificationStatusUpdater{
  constructor(
    @Inject('INotificationLogRepository')
    private readonly notificationLogRepository: INotificationLogRepository,
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