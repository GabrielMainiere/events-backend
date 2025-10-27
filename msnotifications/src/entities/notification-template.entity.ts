import { ObjectType, Field, ID } from '@nestjs/graphql';
import { NotificationChannel } from '@prisma/client';


@ObjectType()
export class NotificationTemplateEntity {
  @Field(() => ID)
  id: string;

  @Field()
  template_name: string;

  @Field(() => String)
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