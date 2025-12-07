import { Inject } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PRISMA_CLIENT } from 'src/core/constants'
import { IUserRepository } from '../domain/IUserRepository'
import { UserDomain } from '../domain/user.entity'
import { UserMapper } from '../application/mappers/user.mapper'

export class UsersRepository implements IUserRepository {
  constructor(@Inject(PRISMA_CLIENT) private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<UserDomain | null> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })
    return user ? UserMapper.toDomain(user) : null
  }

  async upsertUser(user: UserDomain): Promise<UserDomain> {
    const upsertedUser = await this.prisma.user.upsert({
      where: { id: user.id },
      update: { ...user },
      create: { ...user }
    })
    return UserMapper.toDomain(upsertedUser)
  }
}
