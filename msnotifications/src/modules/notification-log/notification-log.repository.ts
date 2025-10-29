import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-ds/prisma.service';
import { NotificationLog, NotificationStatus } from '@prisma/client';
import { CreateNotificationLogDto } from 'src/dto/createNotificationLogDto';
import { INotificationLogRepository } from 'src/interfaces/iNotificationLogRepository';

@Injectable()
export class NotificationLogRepository implements INotificationLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateNotificationLogDto): Promise<NotificationLog> {
    return this.prisma.notificationLog.create({
      data: {
        ...data,
        status: NotificationStatus.PENDENTE,
      },
    });
  }

  async findById(id: string): Promise<NotificationLog | null> {
    return this.prisma.notificationLog.findUnique({
      where: { id },
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

  async updateStatus(
    id: string,
    status: NotificationStatus,
    error_message?: string,
  ): Promise<NotificationLog> {
    return this.prisma.notificationLog.update({
      where: { id },
      data: {
        status,
        error_message,
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