export class UserDomain {
  id: string
  name: string
  email: string
  cpf: string
  birthDatetime?: Date
  phoneNumber?: string
  createdAt: Date
  updatedAt: Date

  private constructor(props: UserDomain) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.cpf = props.cpf
    this.birthDatetime = props.birthDatetime ?? undefined
    this.phoneNumber = props.phoneNumber
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  static create(props: UserDomain): UserDomain {
    return new UserDomain(props)
  }
}
