import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { RoleService } from './role.service'
import { CreateRoleInput, UpdateRoleInput } from 'src/types/graphql'
import { RequiredRole } from 'src/common/decorators/auth'
import { RolesEnum } from 'src/core/enums'

@Resolver('Role')
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation('createRole')
  @RequiredRole(RolesEnum.Admin)
  async create(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return await this.roleService.create(createRoleInput)
  }

  @Query('listRoles')
  @RequiredRole(RolesEnum.Admin)
  async listRoles() {
    return await this.roleService.findAll()
  }

  @Query('findRole')
  @RequiredRole(RolesEnum.Admin)
  async findOne(@Args('id') id: string) {
    return await this.roleService.findOne(id)
  }

  @Mutation('updateRole')
  @RequiredRole(RolesEnum.Admin)
  async update(@Args('id') id: string, @Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return await this.roleService.update(id, updateRoleInput)
  }

  @Mutation('deleteRole')
  @RequiredRole(RolesEnum.Admin)
  async remove(@Args('id') id: string) {
    return await this.roleService.deactivate(id)
  }
}
