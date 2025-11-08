import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, IsEnum, IsBoolean, IsNotEmpty } from 'class-validator';
import { NotificationType } from 'src/common/enum/notification-type.enum';
import { NotificationChannel } from 'src/common/enum/notification-channel.enum';

@InputType()
export class UpsertUserPreferenceInput {
  @Field()
  @IsUUID(4, { message: 'User ID must be a valid UUID v4' })
  @IsNotEmpty({ message: 'User ID is required' })
  user_id: string;

  @Field(() => NotificationType)
  @IsEnum(NotificationType, { message: 'Invalid notification type' })
  @IsNotEmpty({ message: 'Notification type is required' })
  notification_type: NotificationType;

  @Field(() => NotificationChannel)
  @IsEnum(NotificationChannel, { message: 'Invalid notification channel' })
  @IsNotEmpty({ message: 'Notification channel is required' })
  channel: NotificationChannel;

  @Field()
  @IsBoolean({ message: 'is_enabled must be a boolean value' })
  @IsNotEmpty({ message: 'is_enabled is required' })
  is_enabled: boolean;
}