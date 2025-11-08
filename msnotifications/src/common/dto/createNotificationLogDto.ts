import { NotificationChannel } from '@prisma/client';
import { 
  IsString, 
  IsUUID, 
  IsEnum, 
  IsObject,
  IsNotEmpty,
} from 'class-validator';
import { NotificationType } from 'src/common/enum/notification-type.enum';

export class CreateNotificationLogDto {

  @IsUUID(4, { message: 'User ID must be a valid UUID v4' })
  @IsNotEmpty({ message: 'User ID is required' })
  user_id: string;

  @IsEnum(NotificationType, { message: 'Invalid notification type' })
  @IsNotEmpty({ message: 'Notification type is required' })
  notification_type: NotificationType;

  @IsEnum(NotificationChannel, { message: 'Invalid notification channel' })
  @IsNotEmpty({ message: 'Notification channel is required' })
  channel: NotificationChannel;

  @IsString({ message: 'Recipient address must be a string' })
  @IsNotEmpty({ message: 'Recipient address is required' })
  recipient_address: string;

  @IsString({ message: 'Template name must be a string' })
  @IsNotEmpty({ message: 'Template name is required' })
  template_name: string;

  @IsObject({ message: 'Payload must be an object' })
  @IsNotEmpty({ message: 'Payload is required' })
  payload: Record<string, any>;
}