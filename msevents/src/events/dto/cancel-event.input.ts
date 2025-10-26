import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CancelEventInput {
  @Field()
  id: string;
}
