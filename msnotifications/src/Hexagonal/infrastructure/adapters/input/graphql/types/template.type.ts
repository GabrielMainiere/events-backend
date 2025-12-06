import { ObjectType, Field, ID } from '@nestjs/graphql';
import '../enums/register-enums';
import { NotificationType } from '../../../../../domain/enums/notification-type.enum';
import { NotificationChannel } from '../../../../../domain/enums/notification-channel.enum';

@ObjectType('Template')
export class TemplateType {
  @Field(() => ID)
  id: string;

  @Field()
  templateName: string;

  @Field(() => NotificationType)
  notificationType: NotificationType;

  @Field(() => NotificationChannel)
  channel: NotificationChannel;

  @Field()
  subjectTemplate: string;

  @Field()
  bodyTemplate: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}