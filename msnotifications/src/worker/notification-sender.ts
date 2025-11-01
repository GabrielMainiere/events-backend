import { Injectable } from '@nestjs/common';
import { NotificationLog } from '@prisma/client';
import { NotificationFactory } from 'src/modules/factory/notification.factory';

@Injectable()
export class NotificationSender {
  constructor(
    private readonly notificationFactory: NotificationFactory,
  ) {}

  async send(notification: NotificationLog): Promise<void> {
    const strategy = this.notificationFactory.getStrategy(notification.channel);
    await strategy.send(notification);
  }
}