import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  cpf: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  birthDate?: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
