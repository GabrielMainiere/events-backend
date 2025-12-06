import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { NotificationType } from '../../../../../domain/enums/notification-type.enum';
import { NotificationChannel } from '../../../../../domain/enums/notification-channel.enum';

@InputType()
export class UpdateTemplateInput {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  templateId: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  templateName?: string;

  @Field({ nullable: true })
  @IsEnum(NotificationType)
  @IsOptional()
  notificationType?: NotificationType;

  @Field({ nullable: true })
  @IsEnum(NotificationChannel)
  @IsOptional()
  channel?: NotificationChannel;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  subjectTemplate?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  bodyTemplate?: string;
}