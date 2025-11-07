import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GqlEventStatus, GqlEventType } from 'src/enum/registerEnum';

@ObjectType()
export class Event {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  startAt: Date;

  @Field()
  endAt: Date;

  @Field(() => Int, { nullable: true })
  price?: number; //cents

  @Field({ nullable: true })
  saleStartAt?: Date;

  @Field({ nullable: true })
  saleEndAt?: Date;

  @Field()
  street: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field({ nullable: true })
  number?: string;

  @Field()
  zipcode: string;

  @Field()
  country: string;

  @Field()
  capacity: number;

  @Field()
  isFree: boolean;

  @Field(() => GqlEventStatus)
  status: GqlEventStatus;

  @Field(() => GqlEventType)
  eventType: GqlEventType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
