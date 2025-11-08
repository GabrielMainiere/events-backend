import { Injectable } from '@nestjs/common';
import { NotificationLog } from '@prisma/client';
import { StrategyFactory } from 'src/modules/factory/strategy-factory';
import { NotificationTemplateResolver } from 'src/modules/notification-template/notification-resolver-template.service';

@Injectable()
export class NotificationSender {
  constructor(
    private readonly strategyProvider: StrategyFactory,
    private readonly templateResolver: NotificationTemplateResolver,
  ) {}

  async send(notification: NotificationLog): Promise<void> {
    const { subject, body } = await this.templateResolver.resolve(
      notification.template_name,
      notification.payload as Record<string, any>,
    );

    const strategy = this.strategyProvider.getStrategy(notification.channel);

    await strategy.send(notification.recipient_address, subject, body);
  }
}