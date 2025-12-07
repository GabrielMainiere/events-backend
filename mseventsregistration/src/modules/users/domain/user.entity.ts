export class UserDomain {
  id: string
  name: string
  email: string
  cpf: string
  birthDate?: Date
  phone?: string
  createdAt: Date
  updatedAt: Date

  private constructor(props: UserDomain) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.cpf = props.cpf
    this.birthDate = props.birthDate
    this.phone = props.phone
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  static create(props: UserDomain): UserDomain {
    return new UserDomain(props)
  }
}
