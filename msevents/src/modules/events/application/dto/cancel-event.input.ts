import { InputType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CancelEventInput {
  @Field()
  @IsUUID()
  id: string;
}
