import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { GraphQLValidationPipe } from 'src/common/pipes/graphql-validation.pipe'

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
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
  async deactivate(@Args('id') id: string) {
    return await this.userService.deactivate(id)
  }

  @Query('authenticateUser')
  async authenticateUser(@Args('email') email: string, @Args('password') password: string) {
    return await this.userService.authenticate(email, password)
  }
}
