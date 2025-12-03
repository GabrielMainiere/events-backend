import { Inject, Injectable, Logger } from '@nestjs/common';
import type { INotificationLogRepository } from 'src/modules/notification-log/interfaces/iNotificationLogRepository';
import type { INotificationTemplateValidator } from '../notification-template/interfaces/iNotificationTemplateValidator';
import type { INotificationTemplateResolver } from '../notification-template/interfaces/iNotificationTemplateResolver';
import type { IUserPreferenceService } from '../user-preference/interfaces/iUserPreferenceService';
import type { IStrategyFactory } from 'src/modules/factory/interfaces/iStrategyFactory';
import type { IRequestLogger } from '../logger/interfaces/iLogger';
import { NotificationStatus } from '@prisma/client';
import { ProcessNotificationInput } from './interfaces/iProcessNotificationInput';
import { ProcessNotificationOutput } from './interfaces/iProcessNotificationOutput';
import { INotificationProcessor } from './interfaces/iNotificationProcessorService';

@Injectable()
export class NotificationProcessorService implements INotificationProcessor {
  private readonly logger = new Logger(NotificationProcessorService.name);

  constructor(
    @Inject('INotificationLogRepository')
    private readonly notificationLogRepository: INotificationLogRepository,
    @Inject('INotificationTemplateValidator')
    private readonly templateValidator: INotificationTemplateValidator,
    @Inject('INotificationTemplateResolver')
    private readonly templateResolver: INotificationTemplateResolver,
    @Inject('IStrategyFactory')
    private readonly strategyFactory: IStrategyFactory,
    @Inject('IUserPreferenceService')
    private readonly userPreferenceService: IUserPreferenceService,
    @Inject('IRequestLogger')
    private readonly requestLog: IRequestLogger,
  ) {}

  async process(data: ProcessNotificationInput): Promise<ProcessNotificationOutput> {
      const template = await this. templateValidator.findByNameOrFail(data.templateName);

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

      const payload = JSON.parse(data.payloadJson || '{}');
      const notificationLog = await this. notificationLogRepository.create({
        user_id: data.userId,
        template_name: data.templateName,
        notification_type: template.notification_type,
        recipient_address: data. recipientAddress,
        channel: template.channel,
        payload: payload,
        status: NotificationStatus.PROCESSANDO,
      });

      this.requestLog.logNotificationEnqueued(notificationLog.id, data.templateName);

      try {
        const { subject, body } = await this.templateResolver. resolve(
          template.template_name,
          payload,
        );

        const strategy = this.strategyFactory.getStrategy(template.channel);

        await strategy.send(data.recipientAddress, subject, body);

        await this. notificationLogRepository.updateStatus(
          notificationLog.id,
          NotificationStatus.ENVIADO,
        );

        this.logger.log(`Notificação enviada: ${notificationLog.id}`);
        
        return {
            notificationId: notificationLog.id,
            status: NotificationStatus.ENVIADO,
        };

      } catch (error) {
        await this. notificationLogRepository.updateStatus(
          notificationLog.id,
          NotificationStatus.FALHA,
          error.message,
        );

        this.logger.warn(`Falha ao enviar, enviando para DLQ: ${error.message}`);
        throw error;
      }
  }
}