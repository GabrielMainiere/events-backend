import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { EventStatus } from 'generated/prisma';
import { EventType } from 'generated/prisma';
import { Address } from './address.entity';

@ObjectType()
export class Event {
  @Field()
  @IsUUID()
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
  capacity: number;

  @Field()
  isFree: boolean;

  @Field(() => Address)
  address: Address;

  @Field(() => EventStatus)
  status: EventStatus;

  @Field(() => EventType)
  eventType: EventType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
