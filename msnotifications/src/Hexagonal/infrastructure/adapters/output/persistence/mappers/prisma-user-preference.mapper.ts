import { UserPreference } from '../../../../../domain/entities/user-preference.entity';
import { UserPreferenceFactory } from '../../../../../domain/factories/user-preference.factory';
import { NotificationType as DomainType } from '../../../../../domain/enums/notification-type.enum';
import { NotificationChannel as DomainChannel } from '../../../../../domain/enums/notification-channel.enum';
import { NotificationType as PrismaType } from '@prisma/client';
import { NotificationChannel as PrismaChannel } from '@prisma/client';
import type { UserPreference as PrismaUserPreference } from '@prisma/client';
import { UserPreferenceProps } from '../../../../../domain/factories/types/user-preference.type';

export class PrismaUserPreferenceMapper {
  
  static toPrisma(preference: UserPreference): Omit<PrismaUserPreference, 'updated_at'> {
    return {
      id: preference.id,
      user_id: preference.userId,
      notification_type: preference.notificationType as unknown as PrismaType,
      channel: preference.channel as unknown as PrismaChannel,
      is_enabled: preference.isEnabled,
    };
  }

  static toDomain(prisma: PrismaUserPreference): UserPreference {
    const props: UserPreferenceProps = {
      id: prisma.id,
      userId: prisma.user_id,
      notificationType: prisma. notification_type as unknown as DomainType,
      channel: prisma.channel as unknown as DomainChannel,
      isEnabled: prisma.is_enabled,
      updatedAt: prisma.updated_at,
    };

    return UserPreferenceFactory.reconstitute(props);
  }

  static toDomainList(prismaList: PrismaUserPreference[]): UserPreference[] {
    return prismaList.map(p => this.toDomain(p));
  }
}