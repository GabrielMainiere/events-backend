import { Injectable } from '@nestjs/common'

import { UserRepository } from './user.repository'
import { CreateUserInput, UpdateUserInput } from 'src/types/graphql'
import { UserCreateInput, UserUpdateInput } from 'generated/prisma/models'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserInput: CreateUserInput) {
    const serializedCreateUserInput: UserCreateInput = {
      ...createUserInput,
      roles: {
        connect: createUserInput.roles.map(roleId => ({ id: roleId })),
      },
    }

    return await this.userRepository.create(serializedCreateUserInput)
  }

  async findAll() {
    return await this.userRepository.findAll()
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id)
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const serializedUpdateUserInput: UserUpdateInput = {
      ...updateUserInput,
      email: updateUserInput.email ?? undefined,
      password: updateUserInput.password ?? undefined,
      name: updateUserInput.name ?? undefined,
      birthDatetime: updateUserInput.birthDatetime ?? undefined,
      cpf: updateUserInput.cpf ?? undefined,
      phoneNumber: updateUserInput.phoneNumber ?? undefined,
      roles: {
        set: updateUserInput.roles?.map(roleId => ({ id: roleId })),
      },
    }

    return await this.userRepository.update(id, serializedUpdateUserInput)
  }

  async deactivate(id: string) {
    return await this.userRepository.deactivate(id)
  }
}
