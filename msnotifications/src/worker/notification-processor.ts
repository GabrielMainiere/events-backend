import { Inject, Injectable } from '@nestjs/common';
import { NotificationLog } from '@prisma/client';
import { INotificationProcessor } from './interfaces/iNotificationProcessor';
import type { INotificationSender } from './interfaces/iNotificationSender';
import type { IWorkerLogger } from 'src/modules/logger/interfaces/iLogger';
import type { INotificationStatusUpdater } from './interfaces/iNotificationStatusUpdater';

@Injectable()
export class NotificationProcessor implements INotificationProcessor {
  constructor(
    @Inject('INotificationStatusUpdater')
    private readonly statusUpdater: INotificationStatusUpdater,
    @Inject('INotificationSender')
    private readonly sender: INotificationSender,
    @Inject('IWorkerLogger')
    private readonly workerLog: IWorkerLogger,
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