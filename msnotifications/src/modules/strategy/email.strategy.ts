import { Injectable } from '@nestjs/common';
import { INotificationStrategy } from 'src/interfaces/iNotificationStategy';
import { NotificationLog } from '@prisma/client';
import { EmailService } from '../email/email.service';
import type { INotificationTemplateService } from 'src/interfaces/iNotificationTemplateService';
import type { ITemplateProcessor } from 'src/interfaces/iTemplateProcessor';


@Injectable()
export class EmailStrategy implements INotificationStrategy {
  constructor(
    private readonly emailService: EmailService,
    private readonly templateService: INotificationTemplateService,
    private readonly templateProcessor: ITemplateProcessor,
  ) {}

  async send(notification: NotificationLog): Promise<void> {
    const template = await this.getTemplate(notification.template_name);

    const { subject, body } = this.processTemplate(
      template,
      notification.payload as Record<string, any>,
    );

    await this.sendEmail(notification.recipient_address, subject, body);
  }

  private async getTemplate(template_name: string) {
    const template = await this.templateService.findByName(template_name);

    if (!template) {
      throw new Error(`Template ${template_name} não encontrado.`);
    }

    return template;
  }

  private processTemplate(template: any, payload: Record<string, any>) {
    return this.templateProcessor.process(template, payload);
  }

  private async sendEmail(to: string, subject: string, body: string) {
    await this.emailService.sendMail(to, subject, body);
  }
}