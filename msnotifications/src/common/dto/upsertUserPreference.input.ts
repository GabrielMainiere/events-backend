import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, IsEnum, IsBoolean } from 'class-validator';
import { NotificationType } from 'src/common/enum/notification-type.enum';
import { NotificationChannel } from 'src/common/enum/notification-channel.enum';

@InputType()
export class UpsertUserPreferenceInput {
  @Field()
  @IsUUID()
  user_id: string;

  @Field(() => NotificationType)
  @IsEnum(NotificationType)
  notification_type: NotificationType;

  @Field(() => NotificationChannel)
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @Field()
  @IsBoolean()
  is_enabled: boolean;
}