import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-ds/prisma.service';
import { UserPreference, NotificationType, NotificationChannel } from '@prisma/client';
import { UpsertUserPreferenceInput } from 'src/common/dto/upsertUserPreference.input';

@Injectable()
export class UserPreferenceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(
    user_id: string,
    notification_type: NotificationType,
    channel: NotificationChannel,
  ): Promise<UserPreference | null> {
    return this.prisma.userPreference.findUnique({
      where: {
        user_id_notification_type_channel: {
          user_id,
          notification_type,
          channel,
        },
      },
    });
  }

  async findByUserIdAndTypes(
    user_id: string,
    notification_types: NotificationType[],
  ): Promise<UserPreference[]> {
    return this.prisma.userPreference.findMany({
      where: {
        user_id,
        notification_type: { in: notification_types },
      },
      orderBy: [
        { notification_type: 'asc' },
        { channel: 'asc' },
      ],
    });
  }

  async upsert(data: UpsertUserPreferenceInput): Promise<UserPreference> {
    return this.prisma.userPreference.upsert({
      where: {
        user_id_notification_type_channel: {
          user_id: data.user_id,
          notification_type: data.notification_type,
          channel: data.channel,
        },
      },
      update: {
        is_enabled: data.is_enabled,
      },
      create: {
        user_id: data.user_id,
        notification_type: data.notification_type,
        channel: data.channel,
        is_enabled: data.is_enabled,
      },
    });
  }

  async create(
    user_id: string,
    notification_type: NotificationType,
    channel: NotificationChannel,
    is_enabled: boolean = true,
  ): Promise<UserPreference> {
    return this.prisma.userPreference.create({
      data: {
        user_id,
        notification_type,
        channel,
        is_enabled,
      },
    });
  }

  async deleteByUserId(user_id: string) {
    return this.prisma.userPreference.deleteMany({
      where: { user_id },
    });
  }
}
