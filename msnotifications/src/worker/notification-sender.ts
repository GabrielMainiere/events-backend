import { Injectable } from '@nestjs/common';
import { NotificationLog } from '@prisma/client';
import { NotificationTemplateResolver } from 'src/modules/notification-template/notification-resolver-template.service';
import { NotificationStrategyProvider } from 'src/modules/strategy/strategy-provider/notification-strategy.provider';


@Injectable()
export class NotificationSender {
  constructor(
    private readonly strategyProvider: NotificationStrategyProvider,
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