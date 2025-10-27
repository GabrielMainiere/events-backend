import { InputType, Field } from '@nestjs/graphql';
import { NotificationChannel } from '@prisma/client';
import { IsString } from 'class-validator';

@InputType()
export class CreateTemplateInput {
  @Field()
  @IsString()
  template_name: string;

  @Field(() => String)
  @IsString()
  channel: NotificationChannel;

  @Field()
  @IsString()
  subject_template: string;

  @Field()
  @IsString()
  body_template: string;
}