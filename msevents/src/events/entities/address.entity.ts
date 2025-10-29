import { ObjectType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ObjectType()
export class Address {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  street: string;

  @Field({ nullable: true })
  number?: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zipcode: string;

  @Field()
  country: string;
}
