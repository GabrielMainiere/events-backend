import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class QRCode {
  @Field()
  base64: string;

  @Field()
  expiresAt: Date;
}
