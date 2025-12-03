import { Inject, Injectable } from '@nestjs/common';
import { NotificationLog } from '@prisma/client';
import { INotificationSender } from './interfaces/iNotificationSender';
import type{ IStrategyFactory } from 'src/modules/factory/interfaces/iStrategyFactory';
import type { INotificationTemplateResolver } from 'src/modules/notification-template/interfaces/iNotificationTemplateResolver';

@Injectable()
export class NotificationSender implements INotificationSender{
  constructor(
    @Inject('IStrategyFactory')
    private readonly strategyProvider: IStrategyFactory,
    @Inject('INotificationTemplateResolver')
    private readonly templateResolver: INotificationTemplateResolver,
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