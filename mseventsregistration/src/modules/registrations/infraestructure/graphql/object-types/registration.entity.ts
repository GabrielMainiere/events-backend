import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { RegistrationStatusValueObject } from 'src/modules/registrations/domain/value-objects/registration-status.vo'

registerEnumType(RegistrationStatusValueObject, { name: 'RegistrationStatus' })
@ObjectType()
export class Registration {
  @Field()
  id: string

  @Field()
  userId: string

  @Field()
  eventId: string

  @Field(() => RegistrationStatusValueObject)
  status: RegistrationStatusValueObject

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
