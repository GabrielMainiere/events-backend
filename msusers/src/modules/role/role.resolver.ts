import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { RoleService } from './role.service'
import { CreateRoleInput, UpdateRoleInput } from 'src/types/graphql'

@Resolver('Role')
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation('createRole')
  async create(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return await this.roleService.create(createRoleInput)
  }

  @Query('listRoles')
  async listRoles() {
    return await this.roleService.findAll()
  }

  @Query('findRole')
  async findOne(@Args('id') id: string) {
    return await this.roleService.findOne(id)
  }

  @Mutation('updateRole')
  async update(@Args('id') id: string, @Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return await this.roleService.update(id, updateRoleInput)
  }

  @Mutation('deleteRole')
  async remove(@Args('id') id: string) {
    return await this.roleService.deactivate(id)
  }
}
