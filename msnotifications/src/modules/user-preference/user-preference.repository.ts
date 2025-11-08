import { Injectable } from '@nestjs/common';
import { UserPreference, NotificationType, NotificationChannel } from '@prisma/client';
import { IUserPreferenceRepository } from 'src/modules/user-preference/interfaces/iUserPreferenceRepository';
import { PrismaClientSingleton } from 'src/core/prismaClientSingleton';

@Injectable()
export class UserPreferenceRepository implements IUserPreferenceRepository {
  private prisma = PrismaClientSingleton.getInstance();

  async create(data: Partial<UserPreference>): Promise<UserPreference> {
    return this.prisma.userPreference.create({
      data: {
        user_id: data.user_id!,
        notification_type: data.notification_type!,
        channel: data.channel!,
        is_enabled: data.is_enabled ?? true,
      },
    });
  }

  async findUnique(
    userId: string,
    notificationType: NotificationType,
    channel: NotificationChannel,
  ): Promise<UserPreference | null> {
    return this.prisma.userPreference.findUnique({
      where: {
        user_id_notification_type_channel: {
          user_id: userId,
          notification_type: notificationType,
          channel: channel,
        },
      },
    });
  }

  async findByUserIdAndTypes(
    userId: string,
    notificationTypes: NotificationType[],
  ): Promise<UserPreference[]> {
    return this.prisma.userPreference.findMany({
      where: {
        user_id: userId,
        notification_type: { in: notificationTypes },
      },
      orderBy: [
        { notification_type: 'asc' },
        { channel: 'asc' },
      ],
    });
  }

  async upsert(
    userId: string,
    notificationType: NotificationType,
    channel: NotificationChannel,
    isEnabled: boolean,
  ): Promise<UserPreference> {
    return this.prisma.userPreference.upsert({
      where: {
        user_id_notification_type_channel: {
          user_id: userId,
          notification_type: notificationType,
          channel: channel,
        },
      },
      update: {
        is_enabled: isEnabled,
      },
      create: {
        user_id: userId,
        notification_type: notificationType,
        channel: channel,
        is_enabled: isEnabled,
      },
    });
  }

  async deleteByUserId(userId: string): Promise<number> {
    const result = await this.prisma.userPreference.deleteMany({
      where: { user_id: userId },
    });
    return result.count;
  }
}