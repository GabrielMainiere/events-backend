import { Injectable } from '@nestjs/common'
import { RoleRepository } from './role.repository'
import { CreateRoleInput, UpdateRoleInput } from 'src/types/graphql'
import { RoleUpdateInput } from 'generated/prisma/models'

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}
  create(createRoleInput: CreateRoleInput) {
    return this.roleRepository.create(createRoleInput)
  }

  findOne(id: number) {
    return this.roleRepository.findOne(id)
  }

  findAll() {
    return this.roleRepository.findAll()
  }

  update(id: number, updateRoleInput: UpdateRoleInput) {
    const serializedRoleUpdateInput: RoleUpdateInput = {
      ...updateRoleInput,
      name: updateRoleInput.name ?? undefined,
    }

    return this.roleRepository.update(id, serializedRoleUpdateInput)
  }

  deactivate(id: number) {
    return this.roleRepository.deactivate(id)
  }
}
