import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IProcessNotification } from '../../ports/input/notifications/process-notification.port';
import type{ INotificationRepository } from 'src/Hexagonal/domain/repositories/notification-repository.interface';
import type{ ITemplateRepository } from 'src/Hexagonal/domain/repositories/template-repository.interface';
import type{ IUserPreferenceRepository } from 'src/Hexagonal/domain/repositories/user-preference-repository.interface';
import type{ IStrategyFactory } from '../../ports/output/strategy-factory.port';
import { NotificationProcessorService } from 'src/Hexagonal/domain/services/notification-processor.service';
import { NotificationResponse } from '../../dtos/notifications/notification.response';
import { ProcessNotificationCommand } from '../../dtos/notifications/process-notification.command';
import { NotificationMapper } from '../../mappers/notification.mapper';
import { NotificationFactory } from 'src/Hexagonal/domain/factories/notification.factory';
import { UserPreferencePermissionService } from 'src/Hexagonal/domain/services/user-preference-permission.service';

@Injectable()
export class ProcessNotificationUseCase implements IProcessNotification {
  private readonly logger = new Logger(ProcessNotificationUseCase.name);
  constructor(
    @Inject('INotificationRepository')
    private readonly notificationRepo: INotificationRepository,
    @Inject('ITemplateRepository')
    private readonly templateRepo: ITemplateRepository,
    @Inject('IUserPreferenceRepository')
    private readonly userPrefRepo: IUserPreferenceRepository,
    @Inject('IStrategyFactory')
    private readonly strategyFactory: IStrategyFactory,
    private readonly notificationProcessor: NotificationProcessorService,
    private readonly userPreferencePermissionService: UserPreferencePermissionService,
  ) {}

  async execute(command: ProcessNotificationCommand): Promise<NotificationResponse> {

    const template = await this.templateRepo.findByName(command.templateName);
    if (!template) {
      throw new NotFoundException(`Template not found: ${command.templateName}`);
    }

    const userPreference = await this.userPrefRepo.findByUserAndTypeAndChannel(
      command.userId,
      template.notificationType,
      template.channel,
    );

    const canSend = this.userPreferencePermissionService.canSendNotification(
      template.notificationType,
      template.channel,
      userPreference ?   {
        userId: userPreference.userId,
        notificationType: userPreference.notificationType,
        channel: userPreference.channel,
        isEnabled: userPreference.isEnabled,
      } : null,
    );

    if (!canSend) {
      this.logger.warn(`Notificação Bloqueada | User: ${command.userId}`);
      return this.createBlockedResponse(command, template);
    }

    const props = NotificationMapper.commandWithTemplateToDomainProps(command, template);
    const notification = NotificationFactory.create(props);


    this.notificationProcessor.startProcessing(notification);
    
    await this.notificationRepo.save(notification);

    try {
      const content = this.notificationProcessor.renderContent(notification, template);
      const strategy = this.strategyFactory.getStrategy(notification.channel);
      
      await strategy.send(
        notification.recipientAddress.getValue(),
        content.subject,
        content.body,
      );
      
      this.notificationProcessor.markAsSent(notification);
      this.logger.log(`Notificação enviada com sucesso | ${notification.channel} | To: ${notification.recipientAddress.getValue()}`);
    } catch (error) {
      this.logger.error(`Falha ao enviar notificação | Erro: ${error.message}`);
      this.notificationProcessor.markAsFailed(notification, error);
      throw error;
      
    } finally {
      await this.notificationRepo.save(notification);
    }

    return NotificationMapper.domainToResponse(notification);
  }

  private createBlockedResponse(command: ProcessNotificationCommand, template: any): NotificationResponse {
    return new NotificationResponse({
      id: '',
      userId: command.userId,
      notificationType: template.notificationType,
      channel: template.channel,
      recipientAddress: command.recipientAddress,
      templateName: command.templateName,
      status: 'BLOCKED_BY_USER_PREFERENCE',
      sentAt: undefined,
      errorMessage: 'User has disabled this notification type',
      retryCount: 0,
      createdAt: new Date(),
    });
  }
}
