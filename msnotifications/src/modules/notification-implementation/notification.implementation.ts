import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateNotificationLogDto } from 'src/dto/createNotificationLogDto';
import type { ISendNotificationRequest } from 'src/interfaces/iSendNotificationRequest';
import type { ISendNotificationResponse } from 'src/interfaces/iSendNotificationResponse';
import { NotificationLogService } from 'src/modules/notification-log/notification-log.service';
import { NotificationTemplateService } from 'src/modules/notification-template/notification-template.service';

@Controller()
export class NotificationImplementation {
  constructor(
    private readonly notificationLogService: NotificationLogService,
    private readonly templateService: NotificationTemplateService,
  ) {}

  @GrpcMethod('NotificationService', 'SendNotification')
  async sendNotification(
    data: ISendNotificationRequest,
  ): Promise<ISendNotificationResponse> { 
    
    const template = await this.templateService.findOne(data.templateId);
    if (!template) {
      throw new Error(`Template não encontrado: ${data.templateId}`);
    }

    let payload: Record<string, any>;
    try {
      payload = JSON.parse(data.payloadJson);
    } catch (error) {
      throw new Error('Payload JSON inválido');
    }

    const logDto: CreateNotificationLogDto = {
      user_id: data.userId,
      template_name: template.template_name,
      notification_type: template.notification_type,
      recipient_address: data.recipientAddress,
      channel: template.channel, 
      payload: payload,
    };
    
    const notificationLog = await this.notificationLogService.create(logDto);

    return {
      notificationId: notificationLog.id,
      status: notificationLog.status,
    };
  }
}