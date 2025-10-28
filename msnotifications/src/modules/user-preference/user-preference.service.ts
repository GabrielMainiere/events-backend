import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma-ds/prisma.service';
import { UpsertUserPreferenceInput } from 'src/dto/upsertUserPreference.input';
import { NotificationTypeHelper } from 'src/helper/notification-type.helper';
import { NotificationType, NotificationChannel } from '@prisma/client';


@Injectable()
export class UserPreferenceService {
  private readonly logger = new Logger(UserPreferenceService.name);

  constructor(private readonly prisma: PrismaService) {}

  async upsert(data: UpsertUserPreferenceInput) {
    if (!data.is_enabled && NotificationTypeHelper.isMandatory(data.notification_type)) {
      this.logger.warn(
        `Tentativa bloqueada: Usuario ${data.user_id} tentou desabilitar ${data.notification_type}`,
      );

      throw new BadRequestException(
        `Notificações do tipo "${data.notification_type}" são obrigatórias e não podem ser desabilitadas.`,
      );
    }

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

  async canSendNotification(
    user_id: string,
    notification_type: NotificationType,
    channel: NotificationChannel,
  ): Promise<boolean> {
    if (NotificationTypeHelper.isMandatory(notification_type)) {
      return true;
    }

    this.logger.debug(
      `Verificando preferência opcional: usuario ${user_id}, Tipo ${notification_type}, Canal ${channel}`,
    );

    let preference = await this.prisma.userPreference.findUnique({
      where: {
        user_id_notification_type_channel: {
          user_id,
          notification_type,
          channel,
        },
      },
    });

    if (!preference) {
      this.logger.log(
        `Lazy creation: Criando preferência habilitada para usuario ${user_id}, Tipo ${notification_type}`,
      );

      preference = await this.prisma.userPreference.create({
        data: {
          user_id,
          notification_type,
          channel,
          is_enabled: true,
        },
      });
    }

    const canSend = preference.is_enabled;

    if (canSend) {
      this.logger.debug(`Permitido: usuario ${user_id} habilitou ${notification_type}`);
    } else {
      this.logger.warn(`Bloqueado: usuario ${user_id} desabilitou ${notification_type}`);
    }

    return canSend;
  }

    async findOptionalPreferences(user_id: string) {
    const optionalTypes = NotificationTypeHelper.getOptionalTypes();

    return this.prisma.userPreference.findMany({
      where: {
        user_id,
        notification_type: { in: optionalTypes },
      },
      orderBy: [
        { notification_type: 'asc' },
        { channel: 'asc' },
      ],
    });
  }

  async deleteByUserId(user_id: string) {
    const result = await this.prisma.userPreference.deleteMany({
      where: { user_id },
    });
    return result;
  }
}