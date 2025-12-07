import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Registration {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  eventId: string;

  @Field()
  status: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
