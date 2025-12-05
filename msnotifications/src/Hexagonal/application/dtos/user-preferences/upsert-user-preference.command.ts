import { IsUUID, IsEnum, IsBoolean, IsNotEmpty } from 'class-validator';
import { NotificationType } from '../../../domain/value-objects/notification-type.vo';
import { NotificationChannel } from '../../../domain/value-objects/notification-channel.vo';

export class UpsertUserPreferenceCommand {
  
  @IsUUID(4, { message: 'User ID must be a valid UUID v4' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;

  @IsEnum(NotificationType, { message: 'Invalid notification type' })
  @IsNotEmpty({ message: 'Notification type is required' })
  notificationType: string;

  @IsEnum(NotificationChannel, { message: 'Invalid notification channel' })
  @IsNotEmpty({ message: 'Notification channel is required' })
  channel: string;

  @IsBoolean({ message: 'isEnabled must be a boolean value' })
  @IsNotEmpty({ message: 'isEnabled is required' })
  isEnabled: boolean;
}