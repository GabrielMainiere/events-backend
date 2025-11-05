import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CheckInRegistrationInput {
  @Field()
  userId: string;

  @Field()
  eventId: string;
}
