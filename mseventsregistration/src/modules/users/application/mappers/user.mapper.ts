import { User } from '@prisma/client'
import { UserDomain } from '../../domain/user.entity'

export class UserMapper {
  static toDomain(raw: User): UserDomain {
    return UserDomain.create({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      cpf: raw.cpf,
      birthDatetime: raw.birthDatetime ?? undefined,
      phoneNumber: raw.phoneNumber ?? undefined,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    })
  }
}
