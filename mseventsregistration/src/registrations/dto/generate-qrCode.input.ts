import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GenerateQRCodeInput {
  @Field()
  userId: string;

  @Field()
  eventId: string;
}
