import { IsString, IsEnum, IsOptional, MinLength, MaxLength, IsUUID, IsNotEmpty } from 'class-validator';
import { NotificationType } from '../../../domain/value-objects/notification-type.vo';
import { NotificationChannel } from '../../../domain/value-objects/notification-channel.vo';

export class UpdateTemplateCommand {
  
  @IsUUID(4, { message: 'Template ID must be a valid UUID v4' })
  @IsNotEmpty({ message: 'Template ID is required' })
  templateId: string;

  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'Template name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Template name cannot exceed 50 characters' })
  templateName?: string;

  @IsEnum(NotificationType)
  @IsOptional()
  notificationType?: string;

  @IsEnum(NotificationChannel)
  @IsOptional()
  channel?: string;

  @IsString()
  @IsOptional()
  @MinLength(1, { message: 'Subject template cannot be empty' })
  @MaxLength(200, { message: 'Subject template cannot exceed 200 characters' })
  subjectTemplate?: string;

  @IsString()
  @IsOptional()
  @MinLength(1, { message: 'Body template cannot be empty' })
  @MaxLength(5000, { message: 'Body template cannot exceed 5000 characters' })
  bodyTemplate?: string;
}