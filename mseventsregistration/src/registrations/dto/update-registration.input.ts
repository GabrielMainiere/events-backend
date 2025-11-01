import { CreateRegistrationInput } from './create-registration.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRegistrationInput extends PartialType(CreateRegistrationInput) {
  @Field(() => Int)
  id: number;
}
