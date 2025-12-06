import { IsString, IsEnum, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { NotificationChannel } from 'src/Hexagonal/domain/enums/notification-channel.enum';
import { NotificationType } from 'src/Hexagonal/domain/enums/notification-type.enum';


export class CreateTemplateCommand {
  
  @IsString()
  @IsNotEmpty({ message: 'Template name is required' })
  @MinLength(3, { message: 'Template name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Template name cannot exceed 50 characters' })
  templateName: string;

  @IsEnum(NotificationType)
  @IsNotEmpty({ message: 'Notification type is required' })
  notificationType: NotificationType;

  @IsEnum(NotificationChannel)
  @IsNotEmpty({ message: 'Notification channel is required' })
  channel: NotificationChannel;

  @IsString()
  @IsNotEmpty({ message: 'Subject template is required' })
  @MinLength(1, { message: 'Subject template cannot be empty' })
  @MaxLength(200, { message: 'Subject template cannot exceed 200 characters' })
  subjectTemplate: string;

  @IsString()
  @MinLength(1, { message: 'Body template cannot be empty' })
  @MaxLength(5000, { message: 'Body template cannot exceed 5000 characters' })
  @IsNotEmpty({ message: 'Body template is required' })
  bodyTemplate: string;

  constructor(
    templateName: string,
    notificationType: NotificationType,
    channel: NotificationChannel,
    subjectTemplate: string,
    bodyTemplate: string,
  ) {
    this.templateName = templateName;
    this.notificationType = notificationType;
    this.channel = channel;
    this.subjectTemplate = subjectTemplate;
    this.bodyTemplate = bodyTemplate;
  }
}