import { Injectable, NotFoundException } from '@nestjs/common';
import { UserPreferenceService } from '../user-preference/user-preference.service';
import { NotificationEnqueuer } from './notification-enqueuer';
import { RequestLogDecorator } from '../decorator/request-log.decorator';
import { NotificationTemplateValidator } from '../notification-template/notification-template-validator';

interface ProcessNotificationInput {
  userId: string;
  recipientAddress: string;
  templateName: string;
  payloadJson: string;
}

interface ProcessNotificationOutput {
  notificationId: string;
  status: string;
}

@Injectable()
export class NotificationProcessorService {
  constructor(
    private readonly templateValidator: NotificationTemplateValidator, // ← Usa service direto!
    private readonly userPreferenceService: UserPreferenceService,
    private readonly enqueuer: NotificationEnqueuer,
    private readonly requestLog: RequestLogDecorator,
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