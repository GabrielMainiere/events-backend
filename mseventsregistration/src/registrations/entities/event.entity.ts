import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Event {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  start_at: Date;

  @Field()
  end_at: Date;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  sale_start_at?: Date;

  @Field({ nullable: true })
  sale_end_at?: Date;

  @Field()
  address_street: string;

  @Field()
  address_city: string;

  @Field()
  address_state: string;

  @Field()
  address_zipcode: string;
}
