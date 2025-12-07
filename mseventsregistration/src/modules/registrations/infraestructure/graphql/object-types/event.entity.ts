import { ObjectType, Field, Int } from '@nestjs/graphql'
import { EventStatus, EventType } from '@prisma/client'

@ObjectType()
export class Event {
  @Field()
  id: string

  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field()
  startAt: Date

  @Field()
  endAt: Date

  @Field(() => Int, { nullable: true })
  price?: number //cents

  @Field({ nullable: true })
  saleStartAt?: Date

  @Field({ nullable: true })
  saleEndAt?: Date

  @Field()
  addressStreet: string

  @Field()
  addressCity: string

  @Field()
  addressState: string

  @Field({ nullable: true })
  addressNumber?: string

  @Field()
  addressZipcode: string

  @Field()
  addressCountry: string

  @Field()
  capacity: number

  @Field()
  isFree: boolean

  @Field(() => EventStatus)
  status: EventStatus

  @Field(() => EventType)
  eventType: EventType

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
