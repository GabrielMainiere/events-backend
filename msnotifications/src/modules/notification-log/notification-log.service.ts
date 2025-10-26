import { Injectable } from '@nestjs/common';
import { NotificationStatus } from '@prisma/client';
import { CreateNotificationLogDto } from 'src/dto/createNotificationLogDto';
import { PrismaService } from 'src/prisma-ds/prisma.service';

@Injectable()
export class NotificationLogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateNotificationLogDto) {
    return this.prisma.notificationLog.create({
      data: {
        ...data,
        status: NotificationStatus.PENDENTE,
      },
    });
  }
}