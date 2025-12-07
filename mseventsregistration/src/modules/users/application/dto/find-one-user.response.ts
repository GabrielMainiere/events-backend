import { UserDomain } from '../../domain/user.entity'

export class FindOneUserResponse {
  id: string
  name: string
  email: string
  cpf: string
  birthDatetime?: string
  phoneNumber?: string
  createdAt: string
  updatedAt: string

  private constructor(props: FindOneUserResponse) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.cpf = props.cpf
    this.birthDatetime = props.birthDatetime ?? undefined
    this.phoneNumber = props.phoneNumber
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  static toDomain(props: FindOneUserResponse): UserDomain {
    return UserDomain.create({
      id: props.id,
      name: props.name,
      email: props.email,
      cpf: props.cpf,
      birthDatetime: props.birthDatetime
        ? new Date(props.birthDatetime)
        : undefined,
      phoneNumber: props.phoneNumber,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }
}
