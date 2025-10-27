import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { RoleService } from './role.service'
import { CreateRoleInput, UpdateRoleInput } from 'src/types/graphql'

@Resolver('Role')
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation('createRole')
  create(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.roleService.create(createRoleInput)
  }

  @Query('listRoles')
  listRoles() {
    return this.roleService.findAll()
  }

  @Query('listRoles')
  findOne(@Args('id') id: number) {
    return this.roleService.findOne(id)
  }

  @Mutation('updateRole')
  update(@Args('id') id: number, @Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.roleService.update(id, updateRoleInput)
  }

  @Mutation('deleteRole')
  remove(@Args('id') id: number) {
    return this.roleService.deactivate(id)
  }
}
