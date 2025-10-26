import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma-ds/prisma.service';
import { NotificationStatus } from '@prisma/client';
import { NotificationFactory } from 'src/modules/factory/notification.factory';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationFactory: NotificationFactory,
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
        const strategy = this.notificationFactory.getStrategy(notification.channel);
        await strategy.send(notification);

        await this.prisma.notificationLog.update({
          where: { id: notification.id },
          data: {
            status: NotificationStatus.ENVIADO,
            sent_at: new Date(),
          },
        });
        
      } catch (error) {
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