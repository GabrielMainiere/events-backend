import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user.entity';
import { Event } from './event.entity';

@ObjectType()
export class EventWithUsers {
  @Field(() => Event)
  event: Event;

  @Field(() => [User])
  confirmedUsers: User[];
}
