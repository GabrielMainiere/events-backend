import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { EventStatus } from '@prisma/client';
import { EventType } from '@prisma/client';
import { AddressModel } from './address-graphql-model';

@ObjectType()
export class EventModel {
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

  @Field(() => AddressModel)
  address: AddressModel;

  @Field(() => EventStatus)
  status: EventStatus;

  @Field(() => EventType)
  eventType: EventType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}