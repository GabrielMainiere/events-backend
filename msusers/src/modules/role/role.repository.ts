import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from 'generated/prisma/client'
import { RoleCreateInput, RoleUpdateInput } from 'generated/prisma/models'
import { PRISMA_CLIENT } from 'src/core/constants'

@Injectable()
export class RoleRepository {
  constructor(@Inject(PRISMA_CLIENT) private prismaClient: PrismaClient) {}
  create(createRoleInput: RoleCreateInput) {
    return this.prismaClient.role.create({ data: createRoleInput })
  }

  findOne(id: number) {
    return this.prismaClient.role.findUnique({ where: { id } })
  }

  findAll() {
    return this.prismaClient.role.findMany()
  }

  update(id: number, updateRoleInput: RoleUpdateInput) {
    return this.prismaClient.role.update({ where: { id }, data: updateRoleInput })
  }

  deactivate(id: number) {
    return this.prismaClient.role.update({ where: { id }, data: { deletedAt: new Date() } })
  }
}
