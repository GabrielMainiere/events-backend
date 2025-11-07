import { Injectable, BadRequestException } from '@nestjs/common';
import { NotificationTemplate } from '@prisma/client';
import { NotificationLogRepository } from '../notification-log/notification-log.repository';
import { RequestLogger } from '../logger/request-logger';

export interface EnqueueNotificationInput {
  userId: string;
  templateName: string;
  template: NotificationTemplate;
  recipientAddress: string;
  payloadJson: string;
}

export interface EnqueueNotificationOutput {
  notificationId: string;
  status: string;
}

@Injectable()
export class NotificationEnqueuer {
  constructor(
    private readonly notificationLogRepository: NotificationLogRepository,
    private readonly requestLog: RequestLogger,
  ) {}

  async enqueue(data: EnqueueNotificationInput): Promise<EnqueueNotificationOutput> {
    const payload = this.parsePayload(data.payloadJson);

    const notificationLog = await this.notificationLogRepository.create({
      user_id: data.userId,
      template_name: data.templateName,
      notification_type: data.template.notification_type,
      recipient_address: data.recipientAddress,
      channel: data.template.channel,
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