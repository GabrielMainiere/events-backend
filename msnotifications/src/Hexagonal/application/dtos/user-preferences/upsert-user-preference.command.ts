import { IsUUID, IsEnum, IsBoolean, IsNotEmpty } from 'class-validator';
import { NotificationChannel } from 'src/Hexagonal/domain/enums/notification-channel.enum';
import { NotificationType } from 'src/Hexagonal/domain/enums/notification-type.enum';


export class UpsertUserPreferenceCommand {
  
  @IsUUID(4, { message: 'User ID must be a valid UUID v4' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;

  @IsEnum(NotificationType, { message: 'Invalid notification type' })
  @IsNotEmpty({ message: 'Notification type is required' })
  notificationType: NotificationType;
  
  @IsEnum(NotificationChannel, { message: 'Invalid notification channel' })
  @IsNotEmpty({ message: 'Notification channel is required' })
  channel: NotificationChannel;

  @IsBoolean({ message: 'isEnabled must be a boolean value' })
  @IsNotEmpty({ message: 'isEnabled is required' })
  isEnabled: boolean;

  constructor(
    userId: string,
    notificationType: NotificationType,
    channel: NotificationChannel,
    isEnabled: boolean,
  ) {
    this.userId = userId;
    this.notificationType = notificationType;
    this.channel = channel;
    this.isEnabled = isEnabled;
  }
}