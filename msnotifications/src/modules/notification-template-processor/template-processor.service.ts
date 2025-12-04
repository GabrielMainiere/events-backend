import { Injectable } from '@nestjs/common';
import { NotificationTemplate } from '@prisma/client';
import * as handlebars from 'handlebars';
import { ITemplateProcessor } from 'src/modules/notification-template-processor/iTemplateProcessor';

@Injectable()
export class HandlebarsTemplateProcessor implements ITemplateProcessor {
  
    process(
    template: NotificationTemplate,
    payload: Record<string, any>,
  ): { subject: string; body: string } {
    const subject = this.compileTemplate(template.subject_template, payload);
    const body = this.compileTemplate(template.body_template, payload);

    return { subject, body };
  }

  private compileTemplate(
    templateString: string,
    payload: Record<string, any>,
  ): string {
    const compiledTemplate = handlebars.compile(templateString);
    return compiledTemplate(payload);
  }
}