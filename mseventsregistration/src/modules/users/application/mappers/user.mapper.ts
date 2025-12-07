import { User } from '@prisma/client'
import { UserDomain } from '../../domain/user.entity'

export class UserMapper {
  static toDomain(raw: User): UserDomain {
    return UserDomain.create({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      cpf: raw.cpf,
      birthDate: raw.birthDate ?? undefined,
      phone: raw.phone ?? undefined,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    })
  }
}
