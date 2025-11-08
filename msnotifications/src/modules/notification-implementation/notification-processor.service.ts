import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProcessNotificationInput } from 'src/modules/notification-implementation/interfaces/iProcessNotificationInput';
import { ProcessNotificationOutput } from 'src/modules/notification-implementation/interfaces/iProcessNotificationOutput';
import type { INotificationTemplateValidator } from '../notification-template/interfaces/iNotificationTemplateValidator';
import type { IUserPreferenceService } from '../user-preference/interfaces/iUserPreferenceService';
import type { INotificationEnqueuer } from './interfaces/iNotificationEnqueuer';
import type{ IRequestLogger } from '../logger/interfaces/iLogger';


@Injectable()
export class NotificationProcessorService {
  constructor(
    @Inject('INotificationTemplateValidator')
    private readonly templateValidator: INotificationTemplateValidator,
    @Inject('IUserPreferenceService')
    private readonly userPreferenceService: IUserPreferenceService,
    @Inject('INotificationEnqueuer')
    private readonly enqueuer: INotificationEnqueuer,
    @Inject('IRequestLogger')
    private readonly requestLog: IRequestLogger,
  ) {}

  async process(data: ProcessNotificationInput): Promise<ProcessNotificationOutput> {
    const template = await this.templateValidator.findByNameOrFail(data.templateName);

    const canSend = await this.userPreferenceService.canSendNotification(
      data.userId,
      template.notification_type,
      template.channel,
    );

    if (!canSend) {
      this.requestLog.logUserBlocked(data.userId, template.notification_type);
      return {
        notificationId: '',
        status: 'BLOCKED_BY_USER_PREFERENCE',
      };
    }

    return this.enqueuer.enqueue({
      userId: data.userId,
      templateName: data.templateName,
      template: template,
      recipientAddress: data.recipientAddress,
      payloadJson: data.payloadJson,
    });
  }
}