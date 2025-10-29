import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { UpsertUserPreferenceInput } from 'src/dto/upsertUserPreference.input';
import { NotificationTypeHelper } from 'src/helper/notification-type.helper';
import { NotificationType, NotificationChannel } from '@prisma/client';
import { UserPreferenceRepository } from './user-preference.repository';


@Injectable()
export class UserPreferenceService {
  private readonly logger = new Logger(UserPreferenceService.name);

  constructor(
    private readonly repository: UserPreferenceRepository,
  ) {}

  async upsert(data: UpsertUserPreferenceInput) {
    if (!data.is_enabled && NotificationTypeHelper.isMandatory(data.notification_type)) {
      this.logger.warn(
        `Tentativa bloqueada: Usuario ${data.user_id} tentou desabilitar ${data.notification_type}`,
      );

      throw new BadRequestException(
        `Notificações do tipo "${data.notification_type}" são obrigatórias e não podem ser desabilitadas.`,
      );
    }

    return this.repository.upsert(data);
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

    let preference = await this.repository.findUnique(user_id, notification_type, channel);

    if (!preference) {
      this.logger.log(
        `Lazy creation: Criando preferência habilitada para usuario ${user_id}, Tipo ${notification_type}`,
      );

      preference = await this.repository.create(user_id, notification_type, channel, true);
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
    return this.repository.findByUserIdAndTypes(user_id, optionalTypes);
  }

  async deleteByUserId(user_id: string) {
    return this.repository.deleteByUserId(user_id);
  }
}