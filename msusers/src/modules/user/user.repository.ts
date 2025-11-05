import { Inject, Injectable } from '@nestjs/common'

import { PRISMA_CLIENT } from 'src/core/constants'
import { PrismaClient, Prisma } from 'generated/prisma'

type UserCreateInput = Prisma.UserCreateInput
type UserUpdateInput = Prisma.UserUpdateInput

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
      data: { deletedAt: new Date(), isActive: false },
    })
    return deletedUser.id
  }

  async findByEmail(email: string) {
    return await this.prismaClient.user.findUnique({
      where: { email, deletedAt: null, isActive: true },
      include: { roles: true },
    })
  }

  async activate(id: string, activationCode: string) {
    return await this.prismaClient.user.update({
      where: { id, activationCode },
      data: { isActive: true },
      include: { roles: true },
    })
  }
}
