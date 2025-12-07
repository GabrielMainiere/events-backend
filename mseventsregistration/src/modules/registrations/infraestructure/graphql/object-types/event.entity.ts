import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql'
import { EventStatusValueObject } from 'src/modules/events/domain/value-objects/event-status.vo'
import { EventTypeValueObject } from 'src/modules/events/domain/value-objects/event-type.vo'

registerEnumType(EventStatusValueObject, { name: 'EventStatus' })
registerEnumType(EventTypeValueObject, { name: 'EventType' })
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

  @Field(() => EventStatusValueObject)
  status: EventStatusValueObject

  @Field(() => EventTypeValueObject)
  eventType: EventTypeValueObject

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
