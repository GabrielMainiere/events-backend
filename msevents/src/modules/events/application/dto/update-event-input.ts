import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsOptional, IsString, IsInt, IsDate, IsBoolean, IsUUID, ValidateNested } from 'class-validator';
import { AddressInput } from './address.input';
import { Type } from 'class-transformer';

@InputType()
export class UpdateEventInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  startAt?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  endAt?: Date;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  price?: number;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isFree?: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  capacity?: number;

  @Field(() => AddressInput, { nullable: true })
  @ValidateNested()
  @IsOptional()
  @Type(() => AddressInput)
  address: AddressInput;
}
