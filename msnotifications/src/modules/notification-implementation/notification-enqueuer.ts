import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { NotificationTemplate } from '@prisma/client';
import type{ INotificationLogRepository } from 'src/modules/notification-log/interfaces/iNotificationLogRepository';
import type{ IRequestLogger } from '../logger/interfaces/iLogger';

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
    @Inject('INotificationLogRepository')
    private readonly notificationLogRepository: INotificationLogRepository,
    @Inject('IRequestLogger')
    private readonly requestLog: IRequestLogger,
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