import { ObjectType, Field, ID } from '@nestjs/graphql';
import '../enums/register-enums';
import { NotificationType } from '../../../../../domain/enums/notification-type.enum';
import { NotificationChannel } from '../../../../../domain/enums/notification-channel.enum';

@ObjectType('UserPreference')
export class UserPreferenceType {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field(() => NotificationType)
  notificationType: NotificationType;

  @Field(() => NotificationChannel)
  channel: NotificationChannel;

  @Field()
  isEnabled: boolean;

  @Field()
  updatedAt: Date;
}