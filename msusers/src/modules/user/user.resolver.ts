import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { GraphQLValidationPipe } from 'src/common/pipes/graphql-validation.pipe'
import { isPublic, RequiredRole } from 'src/common/decorators/auth'
import { RolesEnum } from 'src/core/enums'

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  @isPublic()
  async create(@Args('createUserInput', GraphQLValidationPipe) createUserInput: CreateUserDto) {
    return await this.userService.create(createUserInput)
  }

  @Query('listUsers')
  async findAll() {
    return await this.userService.findAll()
  }

  @Query('findUser')
  async findOne(@Args('id') id: string) {
    return await this.userService.findOne(id)
  }

  @Mutation('updateUser')
  async update(
    @Args('id') id: string,
    @Args('updateUserInput', GraphQLValidationPipe) updateUserInput: UpdateUserDto
  ) {
    return await this.userService.update(id, updateUserInput)
  }

  @Mutation('deleteUser')
  @RequiredRole(RolesEnum.Admin)
  async deactivate(@Args('id') id: string) {
    return await this.userService.deactivate(id)
  }

  @Query('authenticateUser')
  @isPublic()
  async authenticateUser(@Args('email') email: string, @Args('password') password: string) {
    return await this.userService.authenticate(email, password)
  }

  @Mutation('activateUser')
  @isPublic()
  async activateUser(
    @Args('activateUserId') activateUserId: string,
    @Args('activationCode') activationCode: string
  ) {
    return await this.userService.activate(activateUserId, activationCode)
  }
}
