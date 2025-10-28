import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateNotificationLogDto } from 'src/dto/createNotificationLogDto';
import type { ISendNotificationRequest } from 'src/interfaces/iSendNotificationRequest';
import type { ISendNotificationResponse } from 'src/interfaces/iSendNotificationResponse';
import { NotificationLogService } from 'src/modules/notification-log/notification-log.service';
import { NotificationTemplateService } from 'src/modules/notification-template/notification-template.service';
import { UserPreferenceService } from '../user-preference/user-preference.service';
import { Logger } from '@nestjs/common';

@Controller()
export class NotificationImplementation {
  private readonly logger = new Logger(NotificationImplementation.name);

  constructor(
    private readonly notificationLogService: NotificationLogService,
    private readonly templateService: NotificationTemplateService,
    private readonly userPreferenceService: UserPreferenceService,
  ) {}

  @GrpcMethod('NotificationService', 'SendNotification')
  async sendNotification(
    data: ISendNotificationRequest,
  ): Promise<ISendNotificationResponse> { 
    
    const template = await this.templateService.findOne(data.templateId);
    if (!template) {
      throw new Error(`Template não encontrado: ${data.templateId}`);
    }

    const canSend = await this.userPreferenceService.canSendNotification(
      data.userId,
      template.notification_type,
      template.channel,
    );

    if (!canSend) {
      this.logger.warn(
        `Notificação BLOQUEADA: Usuario ${data.userId} desabilitou ${template.notification_type} via ${template.channel}`,
      );

      return {
        notificationId: '',
        status: 'BLOCKED_BY_USER_PREFERENCE',
      };
    }

    this.logger.log(
      `Preferências OK: Usuario ${data.userId} permite ${template.notification_type}`,
    );

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