import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma-ds/prisma.service'; // <-- Importar
import { EmailService } from '../modules/email/email.service'; // <-- Importar
import { NotificationStatus } from '@prisma/client';
import { NotificationTemplateService } from 'src/modules/notification-template/notification-template.service';
import * as handlebars from 'handlebars';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly templateService: NotificationTemplateService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.logger.debug('WORKER: Procurando por notificações pendentes...');

    const pendingNotifications = await this.prisma.notificationLog.findMany({
      where: {
        status: NotificationStatus.PENDENTE,
      },
    });

    if (pendingNotifications.length === 0) {
      this.logger.debug('WORKER: Nenhuma notificação encontrada.');
      return;
    }

    this.logger.log(`WORKER: ${pendingNotifications.length} notificações encontradas. Processando...`);

    for (const notification of pendingNotifications) {
      await this.prisma.notificationLog.update({
        where: { id: notification.id },
        data: { status: NotificationStatus.PROCESSANDO },
      });

        try {
        const template = await this.templateService.findByName(notification.template_name);
        if (!template) {
          throw new Error(`Template ${notification.template_name} não encontrado.`);
        }

        const subjectTemplate = handlebars.compile(template.subject_template);
        const bodyTemplate = handlebars.compile(template.body_template);

        const payload = notification.payload as Record<string, any>; 
        const subject = subjectTemplate(payload);
        const body = bodyTemplate(payload);

        await this.emailService.sendMail(
          notification.recipient_address,
          subject,
          body,
        );

        await this.prisma.notificationLog.update({
          where: { id: notification.id },
          data: {
            status: NotificationStatus.ENVIADO,
            sent_at: new Date(),
          },
        });
        this.logger.log(`WORKER: Notificação ${notification.id} enviada com sucesso.`);

      } catch (error) {
        this.logger.error(`WORKER: Notificação ${notification.id} falhou. Erro: ${error.message}`);
        await this.prisma.notificationLog.update({
          where: { id: notification.id },
          data: {
            status: NotificationStatus.FALHA,
            error_message: error.message,
            retry_count: notification.retry_count + 1,
          },
        });
      }
    }
  }
}