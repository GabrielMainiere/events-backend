import { IsString, IsEnum, IsOptional, MinLength, MaxLength, IsUUID, IsNotEmpty } from 'class-validator';
import { NotificationChannel } from 'src/Hexagonal/domain/enums/notification-channel.enum';
import { NotificationType } from 'src/Hexagonal/domain/enums/notification-type.enum';


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
  notificationType?: NotificationType;

  @IsEnum(NotificationChannel)
  @IsOptional()
  channel?: NotificationChannel;

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

  constructor(
    templateId: string,
    templateName?: string,
    notificationType?: NotificationType,
    channel?: NotificationChannel,
    subjectTemplate?: string,
    bodyTemplate?: string,
  ) {
    this.templateId = templateId;
    this. templateName = templateName;
    this.notificationType = notificationType;
    this.channel = channel;
    this.subjectTemplate = subjectTemplate;
    this.bodyTemplate = bodyTemplate;
  }  
}