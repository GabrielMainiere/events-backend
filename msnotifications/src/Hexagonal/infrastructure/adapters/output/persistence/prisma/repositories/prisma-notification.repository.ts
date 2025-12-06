import { Injectable } from '@nestjs/common';
import { INotificationRepository } from 'src/Hexagonal/domain/repositories/notification-repository.interface';
import { PrismaClientSingleton } from '../prisma-client.singleton';
import { PrismaNotificationMapper } from '../../mappers/prisma-notification.mapper';
import { Notification } from 'src/Hexagonal/domain/aggregates/notification.aggregate';

@Injectable()
export class PrismaNotificationRepository implements INotificationRepository {
  private prisma = PrismaClientSingleton.getInstance();

  async save(notification: Notification): Promise<void> {
    const prismaData = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notificationLog.upsert({
      where: { id: notification.id },
      update: prismaData,
      create: prismaData,
    });
  }

  async findById(id: string): Promise<Notification | null> {
    const prismaNotification = await this.prisma.notificationLog.findUnique({
      where: { id },
    });

    if (!prismaNotification) return null;

    return PrismaNotificationMapper.toDomain(prismaNotification);
  }

  async findAll(): Promise<Notification[]> {
    const prismaNotifications = await this.prisma.notificationLog.findMany({
      orderBy: { created_at: 'desc' },
    });

    return PrismaNotificationMapper.toDomainList(prismaNotifications);
  }

  async findPending(): Promise<Notification[]> {
    const prismaNotifications = await this.prisma. notificationLog.findMany({
      where: {
        status: 'PENDING',
      },
      orderBy: { created_at: 'asc' },
    });

    return PrismaNotificationMapper. toDomainList(prismaNotifications);
  }

  async findFailedForRetry(maxRetries: number): Promise<Notification[]> {
    const prismaNotifications = await this.prisma.notificationLog.findMany({
      where: {
        status: 'FAILED',
        retry_count: {
          lt: maxRetries,
        },
      },
      orderBy: { created_at: 'asc' },
    });

    return PrismaNotificationMapper.toDomainList(prismaNotifications);
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    const prismaNotifications = await this.prisma.notificationLog. findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });

    return PrismaNotificationMapper.toDomainList(prismaNotifications);
  }
}