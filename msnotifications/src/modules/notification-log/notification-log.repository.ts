import { Injectable } from '@nestjs/common';
import { NotificationLog, NotificationStatus } from '@prisma/client';
import { INotificationLogRepository } from 'src/common/interfaces/iNotificationLogRepository';
import { PrismaClientSingleton } from 'src/core/prismaClientSingleton';


@Injectable()
export class NotificationLogRepository implements INotificationLogRepository {
  private prisma = PrismaClientSingleton.getInstance();

  async findById(id: string): Promise<NotificationLog | null> {
    return this.prisma.notificationLog.findUnique({
      where: { id },
    });
  }

  async create(data: Partial<NotificationLog>): Promise<NotificationLog> {
    return this.prisma.notificationLog.create({
      data: {
        user_id: data.user_id!,
        notification_type: data.notification_type!,
        channel: data.channel!,
        recipient_address: data.recipient_address!,
        template_name: data.template_name!,
        payload: data.payload!,
        status: data.status || NotificationStatus.PENDENTE,
      },
    });
  }


  async findPending(): Promise<NotificationLog[]> {
    return this.prisma.notificationLog.findMany({
      where: {
        status: NotificationStatus.PENDENTE,
      },
      orderBy: {
        created_at: 'asc',
      },
    });
  }

  async findByUserId(userId: string): Promise<NotificationLog[]> {
    return this.prisma.notificationLog.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });
  }

  async findByStatus(status: NotificationStatus): Promise<NotificationLog[]> {
    return this.prisma.notificationLog.findMany({
      where: { status },
      orderBy: { created_at: 'desc' },
    });
  }

  async updateStatus(
    id: string,
    status: NotificationStatus,
    errorMessage?: string,
  ): Promise<NotificationLog> {
    return this.prisma.notificationLog.update({
      where: { id },
      data: {
        status,
        error_message: errorMessage,
        sent_at: status === NotificationStatus.ENVIADO ? new Date() : undefined,
      },
    });
  }

  async incrementRetryCount(id: string): Promise<NotificationLog> {
    return this.prisma.notificationLog.update({
      where: { id },
      data: {
        retry_count: {
          increment: 1,
        },
      },
    });
  }
}