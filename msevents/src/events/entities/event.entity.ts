import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Event {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
