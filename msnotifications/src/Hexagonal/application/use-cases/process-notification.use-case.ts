import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProcessNotification } from '../ports/input/notifications/process-notification.port';
import type{ INotificationRepository } from 'src/Hexagonal/domain/repositories/notification-repository.interface';
import type{ ITemplateRepository } from 'src/Hexagonal/domain/repositories/template-repository.interface';
import type{ IUserPreferenceRepository } from 'src/Hexagonal/domain/repositories/user-preference-repository.interface';
import type{ IEmailGateway } from '../ports/output/email-gateway.port';
import { NotificationProcessorService } from 'src/Hexagonal/domain/services/notification-processor.service';
import { NotificationResponse } from '../dtos/notifications/notification.response';
import { ProcessNotificationCommand } from '../dtos/notifications/process-notification.command';
import { NotificationMapper } from '../mappers/notification.mapper';
import { NotificationFactory } from 'src/Hexagonal/domain/factories/notification.factory';
import { UserPreferencePermissionService } from 'src/Hexagonal/domain/services/user-preference-permission.service';

@Injectable()
export class ProcessNotificationUseCase implements IProcessNotification {
  
  constructor(
    @Inject('INotificationRepository')
    private readonly notificationRepo: INotificationRepository,
    @Inject('ITemplateRepository')
    private readonly templateRepo: ITemplateRepository,
    @Inject('IUserPreferenceRepository')
    private readonly userPrefRepo: IUserPreferenceRepository,
    @Inject('IEmailGateway')
    private readonly emailGateway: IEmailGateway,
    private readonly notificationProcessor: NotificationProcessorService,
    private readonly userPreferencePermissionService: UserPreferencePermissionService,
  ) {}

  async execute(command: ProcessNotificationCommand): Promise<NotificationResponse> {

    const template = await this. templateRepo.findByName(command.templateName);
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
      return this.createBlockedResponse(command, template);
    }

    const props = NotificationMapper.commandToDomainProps(command);
    const notification = NotificationFactory. create(props);


    this.notificationProcessor.startProcessing(notification);
    
    await this.notificationRepo.save(notification);

    try {
      const content = this.notificationProcessor.renderContent(notification, template);
      
      await this.emailGateway.send(
        notification.recipientAddress. getValue(),
        content.subject,
        content.body,
      );
      this.notificationProcessor.markAsSent(notification);
    } catch (error) {
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
