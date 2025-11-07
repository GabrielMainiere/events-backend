import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { NotificationTemplate } from '@prisma/client';
import { RequestLogger } from '../logger/request-logger';
import type{ INotificationLogRepository } from 'src/common/interfaces/iNotificationLogRepository';

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