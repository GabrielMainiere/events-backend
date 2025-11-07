import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationTemplateService } from './notification-template.service';
import { HandlebarsTemplateProcessor } from '../strategy/template-processor/template-processor.service';

export interface ResolvedTemplate {
  subject: string;
  body: string;
}

@Injectable()
export class NotificationTemplateResolver {
  constructor(
    private readonly templateService: NotificationTemplateService,
    private readonly templateProcessor: HandlebarsTemplateProcessor,
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