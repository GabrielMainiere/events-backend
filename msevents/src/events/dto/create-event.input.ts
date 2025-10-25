import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsDateString, IsOptional, IsInt } from 'class-validator';
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
  @IsDateString()
  endAt: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  price?: number; //cents

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  saleStartAt?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  saleEndAt?: string;

  @Field()
  @IsString()
  addressStreet: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  addressNumber?: string;

  @Field()
  @IsString()
  addressCity: string;

  @Field()
  @IsString()
  addressState: string;

  @Field()
  @IsString()
  addressZipcode: string;

  @Field()
  @IsString()
  addressCountry: string;

  @Field(() => EventStatus, { nullable: true })
  @IsOptional()
  status?: EventStatus;

  @Field(() => EventType, { nullable: true })
  @IsOptional()
  eventType?: EventType;
}
