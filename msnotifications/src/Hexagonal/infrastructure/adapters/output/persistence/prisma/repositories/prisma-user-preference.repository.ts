import { Injectable } from '@nestjs/common';
import { IUserPreferenceRepository } from 'src/Hexagonal/domain/repositories/user-preference-repository.interface';
import { PrismaClientSingleton } from '../prisma-client.singleton';
import { UserPreference } from 'src/Hexagonal/domain/entities/user-preference.entity';
import { PrismaUserPreferenceMapper } from '../../mappers/prisma-user-preference.mapper';
import { NotificationType } from 'src/Hexagonal/domain/enums/notification-type.enum';
import { NotificationChannel } from 'src/Hexagonal/domain/enums/notification-channel.enum';

@Injectable()
export class PrismaUserPreferenceRepository implements IUserPreferenceRepository {
  private prisma = PrismaClientSingleton.getInstance();

  async save(preference: UserPreference): Promise<void> {
    const prismaData = PrismaUserPreferenceMapper.toPrisma(preference);

    await this.prisma. userPreference.upsert({
      where: { id: preference.id },
      update: prismaData,
      create: prismaData,
    });
  }

  async findById(id: string): Promise<UserPreference | null> {
    const prismaPreference = await this. prisma.userPreference.findUnique({
      where: { id },
    });

    if (!prismaPreference) return null;

    return PrismaUserPreferenceMapper.toDomain(prismaPreference);
  }

  async findByUserAndTypeAndChannel(
    userId: string,
    notificationType: NotificationType,
    channel: NotificationChannel,
  ): Promise<UserPreference | null> {
    const prismaPreference = await this. prisma.userPreference.findFirst({
      where: {
        user_id: userId,
        notification_type: notificationType as any,
        channel: channel as any,
      },
    });

    if (!prismaPreference) return null;

    return PrismaUserPreferenceMapper.toDomain(prismaPreference);
  }

  async findByUserId(userId: string): Promise<UserPreference[]> {
    const prismaPreferences = await this.prisma.userPreference.findMany({
      where: { user_id: userId },
      orderBy: { updated_at: 'desc' },
    });

    return PrismaUserPreferenceMapper.toDomainList(prismaPreferences);
  }

  async findAll(): Promise<UserPreference[]> {
    const prismaPreferences = await this.prisma.userPreference.findMany({
      orderBy: { updated_at: 'desc' },
    });

    return PrismaUserPreferenceMapper.toDomainList(prismaPreferences);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userPreference.delete({
      where: { id },
    });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.prisma.userPreference. deleteMany({
      where: { user_id: userId },
    });
  }
}