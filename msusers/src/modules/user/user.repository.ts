import { Inject, Injectable } from '@nestjs/common'

import { PRISMA_CLIENT } from 'src/core/constants'
import { UserCreateInput, UserUpdateInput } from 'generated/prisma/models'
import { PrismaClient } from 'generated/prisma/client'

@Injectable()
export class UserRepository {
  constructor(@Inject(PRISMA_CLIENT) private readonly prismaClient: PrismaClient) {}
  async create(createUserInput: UserCreateInput) {
    return await this.prismaClient.user.create({
      data: createUserInput,
      include: { roles: true },
    })
  }

  async findAll() {
    return await this.prismaClient.user.findMany({
      include: { roles: true },
    })
  }

  async findOne(id: string) {
    return await this.prismaClient.user.findUnique({
      where: { id },
      include: { roles: true },
    })
  }

  async update(id: string, updateUserInput: UserUpdateInput) {
    return await this.prismaClient.user.update({
      where: { id },
      data: updateUserInput,
      include: { roles: true },
    })
  }

  async deactivate(id: string) {
    const deletedUser = await this.prismaClient.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
    return deletedUser.id
  }

  async findByEmail(email: string) {
    return await this.prismaClient.user.findUnique({
      where: { email, deletedAt: null },
      include: { roles: true },
    })
  }
}
