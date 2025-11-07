import { Injectable, NotFoundException } from '@nestjs/common';
import { UserPreferenceService } from '../user-preference/user-preference.service';
import { NotificationEnqueuer } from './notification-enqueuer';
import { RequestLogger } from '../logger/request-logger';
import { NotificationTemplateValidator } from '../notification-template/notification-template-validator';
import { ProcessNotificationInput } from 'src/common/interfaces/iProcessNotificationInput';
import { ProcessNotificationOutput } from 'src/common/interfaces/iProcessNotificationOutput';

@Injectable()
export class NotificationProcessorService {
  constructor(
    private readonly templateValidator: NotificationTemplateValidator,
    private readonly userPreferenceService: UserPreferenceService,
    private readonly enqueuer: NotificationEnqueuer,
    private readonly requestLog: RequestLogger,
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