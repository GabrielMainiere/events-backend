import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { NotificationType } from '../../../../../domain/enums/notification-type.enum';
import { NotificationChannel } from '../../../../../domain/enums/notification-channel.enum';

@InputType()
export class CreateTemplateInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  templateName: string;

  @Field()
  @IsEnum(NotificationType)
  notificationType: NotificationType;

  @Field()
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @Field()
  @IsString()
  @IsNotEmpty()
  subjectTemplate: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  bodyTemplate: string;
}