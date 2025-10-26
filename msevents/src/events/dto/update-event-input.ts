import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsOptional, IsString, IsInt, IsDate, IsBoolean, IsUUID } from 'class-validator';

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

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  addressStreet?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  addressNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  addressCity?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  addressState?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  addressZipcode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  addressCountry?: string;
}
