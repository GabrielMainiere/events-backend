import { ObjectType, Field, ID } from '@nestjs/graphql';
import { NotificationType } from 'src/enum/notification-type.enum';
import { NotificationChannel } from 'src/enum/notification-channel.enum';

@ObjectType()
export class UserPreferenceEntity {

  @Field(() => ID)
  id: string;

  @Field()
  user_id: string;

  @Field(() => NotificationType)
  notification_type: NotificationType;

  @Field(() => NotificationChannel)
  channel: NotificationChannel;

  @Field()
  is_enabled: boolean;

  @Field()
  updated_at: Date;
}