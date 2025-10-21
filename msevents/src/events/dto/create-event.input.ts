import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
