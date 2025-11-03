import { ObjectType, Field, ID } from '@nestjs/graphql';
import { NotificationType } from 'src/common/enum/notification-type.enum';
import { NotificationChannel } from 'src/common/enum/notification-channel.enum';


@ObjectType()
export class NotificationTemplateEntity {
  @Field(() => ID)
  id: string;

  @Field()
  template_name: string;

  @Field(() => NotificationType)
  notification_type: NotificationType;

  @Field(() => NotificationChannel)
  channel: NotificationChannel;

  @Field()
  subject_template: string;

  @Field()
  body_template: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}