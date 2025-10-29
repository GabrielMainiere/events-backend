import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class AddressInput {
  @Field()
  @IsString()
  street: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  number?: string;

  @Field()
  @IsString()
  city: string;

  @Field()
  @IsString()
  state: string;

  @Field()
  @IsString()
  zipcode: string;

  @Field()
  @IsString()
  country: string;
}
