import { Notification } from '../../../../../domain/aggregates/notification.aggregate';
import { NotificationFactory } from '../../../../../domain/factories/notification.factory';
import { Email } from '../../../../../domain/value-objects/email.vo';
import { NotificationType as DomainType } from '../../../../../domain/enums/notification-type.enum';
import { NotificationChannel as DomainChannel } from '../../../../../domain/enums/notification-channel.enum';
import { NotificationStatus as DomainStatus } from '../../../../../domain/enums/notification-status.enum';
import { NotificationType as PrismaType } from '@prisma/client';
import { NotificationChannel as PrismaChannel } from '@prisma/client';
import { NotificationStatus as PrismaStatus } from '@prisma/client';
import type { NotificationLog as PrismaNotificationLog } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { NotificationProps } from '../../../../../domain/factories/types/notification.types';

export class PrismaNotificationMapper {

  static toPrisma(notification: Notification): Prisma.NotificationLogUncheckedCreateInput {  // ← MUDOU tipo retorno
    return {
      id: notification.id,
      user_id: notification. userId,
      notification_type: notification.notificationType as unknown as PrismaType,
      channel: notification.channel as unknown as PrismaChannel,
      status: notification.status as unknown as PrismaStatus,
      recipient_address: notification.recipientAddress. getValue(),
      template_name: notification.templateName,
      payload: notification.payload as Prisma.InputJsonValue,
      error_message: notification.errorMessage ??  null,
      retry_count: notification.retryCount,
    };
  }

  static toDomain(prisma: PrismaNotificationLog): Notification {
    const props: NotificationProps = {
      id: prisma.id,
      userId: prisma.user_id,
      notificationType: prisma.notification_type as unknown as DomainType,
      channel: prisma.channel as unknown as DomainChannel,
      status: prisma.status as unknown as DomainStatus,
      recipientAddress: Email.create(prisma.recipient_address),
      templateName: prisma. template_name,
      payload: prisma.payload as Record<string, any>,
      sentAt: prisma.sent_at ??  undefined,
      errorMessage: prisma.error_message ?? undefined,
      retryCount: prisma. retry_count,
      createdAt: prisma.created_at,
    };

    return NotificationFactory.reconstitute(props);
  }

  static toDomainList(prismaList: PrismaNotificationLog[]): Notification[] {
    return prismaList.map(p => this.toDomain(p));
  }
}