import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateNotificationLogDto } from 'src/dto/createNotificationLogDto';
import type { ISendNotificationRequest } from 'src/interfaces/iSendNotificationRequest';
import type { ISendNotificationResponse } from 'src/interfaces/iSendNotificationResponse';
import { NotificationLogService } from 'src/modules/notification-log/notification-log.service';
import { NotificationTemplateService } from 'src/modules/notification-template/notification-template.service';
import { UserPreferenceService } from '../user-preference/user-preference.service';
import { NotificationTemplate, NotificationType, NotificationChannel } from '@prisma/client';


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
    const template = await this.validateAndGetTemplate(data.templateId);

    const canSend = await this.checkUserPreference(
      data.userId,
      template.notification_type,
      template.channel,
    );

    if (!canSend) {
      return this.buildBlockedResponse(data.userId, template);
    }

    return await this.enqueueNotification(data, template);
  }

  private async validateAndGetTemplate(
    templateId: string,
  ): Promise<NotificationTemplate> {
    const template = await this.templateService.findOne(templateId);

    if (!template) {
      throw new Error(`Template não encontrado: ${templateId}`);
    }

    return template;
  }

  private async checkUserPreference(
    userId: string,
    notificationType: NotificationType,
    channel: NotificationChannel,
  ): Promise<boolean> {
    const canSend = await this.userPreferenceService.canSendNotification(
      userId,
      notificationType,
      channel,
    );

    return canSend;
  }

  private buildBlockedResponse(
    userId: string,
    template: NotificationTemplate,
  ): ISendNotificationResponse {

    return {
      notificationId: '',
      status: 'BLOCKED_BY_USER_PREFERENCE',
    };
  }

  private async enqueueNotification(
    data: ISendNotificationRequest,
    template: NotificationTemplate,
  ): Promise<ISendNotificationResponse> {
    const payload = this.parsePayload(data.payloadJson);
    const logDto = this.buildNotificationLogDto(data, template, payload);
    const notificationLog = await this.createNotificationLog(logDto);

    this.logEnqueued(notificationLog.id);

    return {
      notificationId: notificationLog.id,
      status: notificationLog.status,
    };
  }

  private parsePayload(payloadJson: string): Record<string, any> {
    try {
      return JSON.parse(payloadJson);
    } catch (error) {
      throw new Error('Payload JSON inválido');
    }
  }


  private buildNotificationLogDto(
    data: ISendNotificationRequest,
    template: NotificationTemplate,
    payload: Record<string, any>,
  ): CreateNotificationLogDto {
    return {
      user_id: data.userId,
      template_name: template.template_name,
      notification_type: template.notification_type,
      recipient_address: data.recipientAddress,
      channel: template.channel,
      payload: payload,
    };
  }

  private async createNotificationLog(logDto: CreateNotificationLogDto) {
    return this.notificationLogService.create(logDto);
  }

  private logEnqueued(notificationId: string): void {
    this.logger.log(
      `[ENQUEUED] Notificação enfileirada | ${JSON.stringify({ id: notificationId })}`,
    );
  }
}