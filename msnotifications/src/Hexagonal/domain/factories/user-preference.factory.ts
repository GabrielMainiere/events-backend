import { randomUUID } from 'crypto';
import { UserPreference } from '../entities/user-preference.entity';
import { CreateUserPreferenceProps, UserPreferenceProps } from './types/user-preference.type';

export class UserPreferenceFactory {
  static create(props: CreateUserPreferenceProps): UserPreference {
    return new UserPreference(
      randomUUID(),
      props.userId,
      props.notificationType,
      props.channel,
      props.isEnabled ??  true,
      new Date()
    );
  }

  static reconstitute(props: UserPreferenceProps): UserPreference {
    return new UserPreference(
      props.id,
      props.userId,
      props.notificationType,
      props.channel,
      props.isEnabled,
      props. updatedAt
    );
  }
}