import { InputType, Field } from '@nestjs/graphql';
import { 
  IsString, 
  IsEnum, 
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
import { NotificationType } from 'src/common/enum/notification-type.enum';
import { NotificationChannel } from 'src/common/enum/notification-channel.enum';

@InputType()
export class CreateTemplateInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Template name is required' })
  @MinLength(3, { message: 'Template name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Template name cannot exceed 50 characters' })
  template_name: string;

  @Field(() => NotificationType)
  @IsEnum(NotificationType)
  @IsNotEmpty({ message: 'Notification type is required' })
  notification_type: NotificationType;

  @Field(() => NotificationChannel)
  @IsEnum(NotificationChannel)
  @IsNotEmpty({ message: 'Notification channel is required' })
  channel: NotificationChannel;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Subject template is required' })
  @MinLength(1, { message: 'Subject template cannot be empty' })
  @MaxLength(200, { message: 'Subject template cannot exceed 200 characters' })
  subject_template: string;

  @Field()
  @IsString()
  @MinLength(1, { message: 'Body template cannot be empty' })
  @MaxLength(5000, { message: 'Body template cannot exceed 5000 characters' })
  @IsNotEmpty({ message: 'Body template is required' })
  body_template: string;
}