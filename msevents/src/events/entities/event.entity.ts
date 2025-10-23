import { ObjectType, Field } from '@nestjs/graphql';
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

  @Field({ nullable: true })
  endAt?: Date;

  @Field({ nullable: true })
  location?: string;

  @Field(() => EventStatus)
  status: EventStatus;

  @Field(() => EventType)
  eventType: EventType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
