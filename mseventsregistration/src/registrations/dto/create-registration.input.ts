import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRegistrationInput {
  @Field()
  eventId: string;

  @Field()
  userId: string;
}
