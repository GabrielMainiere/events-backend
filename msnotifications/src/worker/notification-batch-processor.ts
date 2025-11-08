import { Inject, Injectable } from '@nestjs/common';
import { NotificationLog } from '@prisma/client';
import { BatchResult } from 'src/worker/interfaces/iBathResult';
import type { INotificationProcessor } from './interfaces/iNotificationProcessor';


@Injectable()
export class NotificationBatchProcessor {
  constructor(
    @Inject('INotificationProcessor')
    private readonly notificationProcessor: INotificationProcessor,
  ) {}

  async process(notifications: NotificationLog[]): Promise<BatchResult> {
    let successCount = 0;
    let failureCount = 0;

    for (const notification of notifications) {
      const success = await this.notificationProcessor.process(notification);
      
      if (success) {
        successCount++;
      } else {
        failureCount++;
      }
    }

    return { successCount, failureCount };
  }
}