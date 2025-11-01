import { Injectable } from '@nestjs/common';
import { NotificationLog } from '@prisma/client';
import { NotificationSender } from './notification-sender';
import { WorkerLogDecorator } from 'src/modules/decorator/worker-log.decorator';
import { NotificationStatusUpdater } from './notification-status-updater.service';

@Injectable()
export class NotificationProcessor {
  constructor(
    private readonly statusUpdater: NotificationStatusUpdater,
    private readonly sender: NotificationSender,
    private readonly workerLog: WorkerLogDecorator,
  ) {}

  async process(notification: NotificationLog): Promise<boolean> {
    this.workerLog.logNotificationProcessing(notification.id);

    await this.statusUpdater.markAsProcessing(notification.id);

    try {
      await this.sender.send(notification);
      await this.statusUpdater.markAsSuccess(notification.id);
      
      this.workerLog.logNotificationSuccess(notification.id);
      return true;
    } catch (error) {
      await this.statusUpdater.markAsFailure(notification.id, error.message);
      
      this.workerLog.logNotificationFailure(notification.id, error);
      return false;
    }
  }
}