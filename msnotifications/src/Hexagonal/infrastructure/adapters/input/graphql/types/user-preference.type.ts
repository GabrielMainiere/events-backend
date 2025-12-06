import { ObjectType, Field, ID } from '@nestjs/graphql';
import { NotificationType } from '../../../../../domain/enums/notification-type.enum';
import { NotificationChannel } from '../../../../../domain/enums/notification-channel.enum';

@ObjectType('UserPreference')
export class UserPreferenceType {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  notificationType: NotificationType;

  @Field()
  channel: NotificationChannel;

  @Field()
  isEnabled: boolean;

  @Field()
  updatedAt: Date;
}