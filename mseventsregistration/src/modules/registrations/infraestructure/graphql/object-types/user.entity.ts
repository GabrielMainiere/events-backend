import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  cpf: string

  @Field()
  phoneNumber?: string

  @Field()
  birthDatetime?: Date

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
