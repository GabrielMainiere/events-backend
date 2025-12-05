import { UserPreference } from '../../domain/models/user-preference.model';
import { UpsertUserPreferenceCommand } from '../dtos/user-preferences/upsert-user-preference.command';
import { UserPreferenceResponse } from '../dtos/user-preferences/user-preference.response';
import { randomUUID } from 'crypto';

export class UserPreferenceMapper {
  
  static commandToModel(command: UpsertUserPreferenceCommand): UserPreference {
    return {
      id: randomUUID(),
      userId: command.userId,
      notificationType: command.notificationType,
      channel: command.channel,
      isEnabled: command.isEnabled,
      updatedAt: new Date(),
    };
  }

  static applyCommandToExisting(
    existing: UserPreference,
    command: UpsertUserPreferenceCommand
  ): UserPreference {
    return {
      ...existing,
      isEnabled: command.isEnabled,
      updatedAt: new Date(),
    };
  }

  static modelToResponse(preference: UserPreference): UserPreferenceResponse {
    return new UserPreferenceResponse(
      preference.id,
      preference.userId,
      preference.notificationType,
      preference.channel,
      preference.isEnabled,
      preference.updatedAt
    );
  }

  static modelListToResponseList(preferences: UserPreference[]): UserPreferenceResponse[] {
    return preferences. map(p => this.modelToResponse(p));
  }
}