import { Injectable } from '@nestjs/common';
import { NotificationLog } from '@prisma/client';
import { NotificationProcessor } from './notification-processor';
import { BatchResult } from 'src/common/interfaces/iBathResult';


@Injectable()
export class NotificationBatchProcessor {
  constructor(
    private readonly notificationProcessor: NotificationProcessor,
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