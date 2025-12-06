import { IsString, IsUUID, IsEnum, IsObject, IsNotEmpty } from 'class-validator';
import { NotificationChannel } from 'src/Hexagonal/domain/enums/notification-channel.enum';
import { NotificationType } from 'src/Hexagonal/domain/enums/notification-type.enum';

export class ProcessNotificationCommand {
  
  @IsUUID(4, { message: 'User ID must be a valid UUID v4' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;

  @IsString({ message: 'Recipient address must be a string' })
  @IsNotEmpty({ message: 'Recipient address is required' })
  recipientAddress: string;

  @IsString({ message: 'Template name must be a string' })
  @IsNotEmpty({ message: 'Template name is required' })
  templateName: string;

  @IsObject({ message: 'Payload must be an object' })
  @IsNotEmpty({ message: 'Payload is required' })
  payload: Record<string, any>;
}