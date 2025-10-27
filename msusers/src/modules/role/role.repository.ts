import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from 'generated/prisma/client'
import { RoleCreateInput, RoleUpdateInput } from 'generated/prisma/models'
import { PRISMA_CLIENT } from 'src/core/constants'

@Injectable()
export class RoleRepository {
  constructor(@Inject(PRISMA_CLIENT) private prismaClient: PrismaClient) {}
  async create(createRoleInput: RoleCreateInput) {
    return await this.prismaClient.role.create({ data: createRoleInput })
  }

  async findOne(id: string) {
    return await this.prismaClient.role.findUnique({ where: { id } })
  }

  async findAll() {
    return await this.prismaClient.role.findMany()
  }

  async update(id: string, updateRoleInput: RoleUpdateInput) {
    return await this.prismaClient.role.update({ where: { id }, data: updateRoleInput })
  }

  async deactivate(id: string) {
    const deletedRole = await this.prismaClient.role.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
    return deletedRole.id
  }
}
