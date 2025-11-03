import { Injectable } from '@nestjs/common';
import { NotificationLog } from '@prisma/client';
import { NotificationStrategyProvider } from 'src/modules/strategy/strategy-provider/notification-strategy.provider';

@Injectable()
export class NotificationSender {
  constructor(
    private readonly strategyProvider: NotificationStrategyProvider,
  ) {}

  async send(notification: NotificationLog): Promise<void> {
    const strategy = this.strategyProvider.getStrategy(notification.channel);
    await strategy.send(notification);
  }
}