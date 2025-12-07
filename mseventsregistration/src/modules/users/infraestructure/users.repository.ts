import { Inject } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PRISMA_CLIENT } from 'src/core/constants'
import { IUserRepository } from '../domain/IUserRepository'
import { UserDomain } from '../domain/user.entity'

export class UsersRepository implements IUserRepository {
  constructor(@Inject(PRISMA_CLIENT) private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<UserDomain | null> {
    return await this.prisma.user.findUnique({
      where: { id }
    })
  }

  async upsertUser(user: UserDomain): Promise<UserDomain> {
    return this.prisma.user.upsert({
      where: { id: user.id },
      update: { ...user },
      create: { ...user }
    })
  }
}
