import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEnum, IsBoolean } from 'class-validator';
import { NotificationType } from '../../../../../domain/enums/notification-type.enum';
import { NotificationChannel } from '../../../../../domain/enums/notification-channel.enum';

@InputType()
export class UpsertUserPreferenceInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsEnum(NotificationType)
  notificationType: NotificationType;

  @Field()
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @Field()
  @IsBoolean()
  isEnabled: boolean;
}