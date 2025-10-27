import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEnum } from 'class-validator';
import { NotificationType } from 'src/enum/notification-type.enum';
import { NotificationChannel } from 'src/enum/notification-channel.enum';

@InputType()
export class CreateTemplateInput {
  @Field()
  @IsString()
  template_name: string;

  @Field(() => NotificationType)
  @IsEnum(NotificationType)
  notification_type: NotificationType;

  @Field(() => NotificationChannel)
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @Field()
  @IsString()
  subject_template: string;

  @Field()
  @IsString()
  body_template: string;
}