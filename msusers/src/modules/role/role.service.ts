import { Injectable } from '@nestjs/common'
import { RoleRepository } from './role.repository'
import { CreateRoleInput, UpdateRoleInput } from 'src/types/graphql'
import { RoleUpdateInput } from 'generated/prisma/models'

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}
  async create(createRoleInput: CreateRoleInput) {
    return await this.roleRepository.create(createRoleInput)
  }

  async findOne(id: string) {
    return await this.roleRepository.findOne(id)
  }

  async findAll() {
    return await this.roleRepository.findAll()
  }

  async update(id: string, updateRoleInput: UpdateRoleInput) {
    const serializedRoleUpdateInput: RoleUpdateInput = {
      ...updateRoleInput,
      name: updateRoleInput.name ?? undefined,
    }

    return await this.roleRepository.update(id, serializedRoleUpdateInput)
  }

  async deactivate(id: string) {
    return await this.roleRepository.deactivate(id)
  }
}
