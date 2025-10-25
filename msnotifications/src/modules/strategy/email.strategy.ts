import { Injectable, Logger } from '@nestjs/common';
import { INotificationStrategy } from 'src/interfaces/iNotificationStategy';
import { NotificationLog } from '@prisma/client';
import { EmailService } from '../email/email.service';
import { NotificationTemplateService } from '../notification-template/notification-template.service';
import * as handlebars from 'handlebars';

@Injectable()
export class EmailStrategy implements INotificationStrategy {
  private readonly logger = new Logger(EmailStrategy.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly templateService: NotificationTemplateService,
  ) {}

  async send(notification: NotificationLog): Promise<void> {
    this.logger.log(`Iniciando envio de E-MAIL para: ${notification.recipient_address}`);
    
    const template = await this.templateService.findByName(notification.template_name);
    if (!template) {
      throw new Error(`Template ${notification.template_name} não encontrado.`);
    }

    const subjectTemplate = handlebars.compile(template.subject_template);
    const bodyTemplate = handlebars.compile(template.body_template);
    const payload = notification.payload as Record<string, any>;
    
    const subject = subjectTemplate(payload);
    const body = bodyTemplate(payload);

    await this.emailService.sendMail(notification.recipient_address, subject, body);
    this.logger.log(`E-MAIL enviado para: ${notification.recipient_address}`);
  }
}