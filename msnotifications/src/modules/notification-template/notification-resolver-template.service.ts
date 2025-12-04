import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ITemplateProcessor } from '../notification-template-processor/iTemplateProcessor';
import { INotificationTemplateResolver } from './interfaces/iNotificationTemplateResolver';
import type{ INotificationTemplateService } from './interfaces/iNotificationTemplateService';

export interface ResolvedTemplate {
  subject: string;
  body: string;
}

@Injectable()
export class NotificationTemplateResolver implements INotificationTemplateResolver{
  constructor(
    @Inject('INotificationTemplateService')
    private readonly templateService: INotificationTemplateService,

    @Inject('ITemplateProcessor')
    private readonly templateProcessor: ITemplateProcessor,
  ) {}

  async resolve(
    templateName: string,
    payload: Record<string, any>,
  ): Promise<ResolvedTemplate> {
    const template = await this.templateService.findByName(templateName);
    
    if (!template) {
      throw new NotFoundException(
        `Template "${templateName}" not found`,
      );
    }

    const { subject, body } = this.templateProcessor.process(template, payload);

    return { subject, body };
  }
}