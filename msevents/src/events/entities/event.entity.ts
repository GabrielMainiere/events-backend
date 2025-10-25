import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EventStatus } from 'generated/prisma';
import { EventType } from 'generated/prisma';

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
  addressStreet: string;

  @Field({ nullable: true })
  addressNumber?: string;

  @Field()
  addressCity: string;

  @Field()
  addressState: string;

  @Field()
  addressZipcode: string;

  @Field()
  addressCountry: string;

  @Field(() => EventStatus)
  status: EventStatus;

  @Field(() => EventType)
  eventType: EventType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
