import { ObjectType, Field } from '@nestjs/graphql';
import { Event } from './event.entity';
import { User } from './user.entity';

@ObjectType()
export class EventWithUsers {
  @Field(() => Event)
  event: Event;

  @Field(() => [User])
  confirmedUsers: User[];
}