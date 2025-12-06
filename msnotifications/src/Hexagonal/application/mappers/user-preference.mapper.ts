import { UserPreference } from '../../domain/entities/user-preference.entity';
import { NotificationType } from '../../domain/enums/notification-type.enum';
import { NotificationChannel } from '../../domain/enums/notification-channel.enum';
import { UpsertUserPreferenceCommand } from '../dtos/user-preferences/upsert-user-preference.command';
import { UserPreferenceResponse } from '../dtos/user-preferences/user-preference.response';
import { CreateUserPreferenceProps } from 'src/Hexagonal/domain/factories/types/user-preference.type';

export class UserPreferenceMapper {

  static commandToDomainProps(command: UpsertUserPreferenceCommand): CreateUserPreferenceProps {
    return {
      userId: command.userId,
      notificationType: command.notificationType as NotificationType,  
      channel: command.channel as NotificationChannel,  
      isEnabled: command.isEnabled,
    };
  }

  static applyUpsertCommand(preference: UserPreference, command: UpsertUserPreferenceCommand): void {
    preference.updateEnabledState(command.isEnabled);
  }

  static entityToResponse(preference: UserPreference): UserPreferenceResponse {
    return new UserPreferenceResponse({
      id: preference. id,
      userId: preference. userId,
      notificationType: preference.notificationType,
      channel: preference.channel,
      isEnabled: preference.isEnabled,
      updatedAt: preference.updatedAt,
    });
  }

  static entityListToResponseList(preferences: UserPreference[]): UserPreferenceResponse[] {
    return preferences.map(p => this. entityToResponse(p));
  }
}