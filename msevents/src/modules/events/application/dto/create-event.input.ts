import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsDateString, IsOptional, IsInt, IsBoolean, ValidateNested } from 'class-validator';
import { EventStatus } from 'generated/prisma';
import { EventType } from 'generated/prisma';
import { AddressInput } from './address.input';
import { Type } from 'class-transformer';

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

  @Field(() => AddressInput)
  @ValidateNested()
  @Type(() => AddressInput)
  address: AddressInput;

  @Field()
  @IsInt()
  capacity: number;

  @Field()
  @IsBoolean()
  isFree: boolean; 

  @Field(() => EventStatus, { nullable: true })
  @IsOptional()
  status?: EventStatus;

  @Field(() => EventType, { nullable: true })
  @IsOptional()
  eventType?: EventType;
}
