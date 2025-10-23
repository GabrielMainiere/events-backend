import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsDateString, IsOptional } from 'class-validator';
import { EventStatus } from 'generated/prisma';
import { EventType } from 'generated/prisma';

@InputType()
export class CreateEventInput {
  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field()
  @IsDateString()
  startAt: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  endAt?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @Field(() => EventStatus, { nullable: true })
  @IsOptional()
  status?: EventStatus;

  @Field(() => EventType, { nullable: true })
  @IsOptional()
  eventType?: EventType;
}
