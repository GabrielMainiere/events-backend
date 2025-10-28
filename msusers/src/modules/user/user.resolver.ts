import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserService } from './user.service'
import { CreateUserInput, UpdateUserInput } from 'src/types/graphql'

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
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
  async update(@Args('id') id: string, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.userService.update(id, updateUserInput)
  }

  @Mutation('deleteUser')
  async deactivate(@Args('id') id: string) {
    return await this.userService.deactivate(id)
  }
}
