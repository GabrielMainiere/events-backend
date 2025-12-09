import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AddressModel {

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