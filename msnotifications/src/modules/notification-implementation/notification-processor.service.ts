import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { NotificationLogService } from '../notification-log/notification-log.service';
import { NotificationTemplateService } from '../notification-template/notification-template.service';
import { UserPreferenceService } from '../user-preference/user-preference.service';
import { RequestLogDecorator } from '../decorator/request-log.decorator';

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
    private readonly notificationLogService: NotificationLogService,
    private readonly templateService: NotificationTemplateService,
    private readonly userPreferenceService: UserPreferenceService,
    private readonly requestLog: RequestLogDecorator,
  ) {}

  async process(data: ProcessNotificationInput): Promise<ProcessNotificationOutput> {
    const template = await this.templateService.findByName(data.templateName);
    
    if (!template) {
      this.requestLog.logTemplateNotFound(data.templateName);
      throw new NotFoundException(`Template não encontrado: ${data.templateName}`);
    }

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

    const payload = this.parsePayload(data.payloadJson);

    const notificationLog = await this.notificationLogService.create({
      user_id: data.userId,
      template_name: data.templateName,
      notification_type: template.notification_type,
      recipient_address: data.recipientAddress,
      channel: template.channel,
      payload: payload,
    });

    this.requestLog.logNotificationEnqueued(notificationLog.id, data.templateName);

    return {
      notificationId: notificationLog.id,
      status: notificationLog.status,
    };
  }

  private parsePayload(payloadJson: string): Record<string, any> {
    try {
      return JSON.parse(payloadJson);
    } catch (error) {
      this.requestLog.logInvalidPayload(error.message);
      throw new BadRequestException('Payload JSON inválido');
    }
  }
}