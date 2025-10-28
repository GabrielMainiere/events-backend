import { Injectable } from '@nestjs/common'

import { UserRepository } from './user.repository'
import { CreateUserInput, UpdateUserInput } from 'src/types/graphql'
import { UserCreateInput, UserUpdateInput } from 'generated/prisma/models'
import { sign } from 'jsonwebtoken'
import { environment } from 'src/core/environment'
import { hash, compare } from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserInput: CreateUserInput) {
    const serializedCreateUserInput: UserCreateInput = {
      ...createUserInput,
      password: await hash(createUserInput.password, environment.saltRounds),
      roles: {
        connect: createUserInput.roles.map(roleId => ({ id: roleId })),
      },
    }

    const user = await this.userRepository.create(serializedCreateUserInput)
    const token = this.getToken(user.id)
    return { email: user.email, name: user.name, roles: user.roles, token }
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

  async authenticate(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email)
    if (!user || !(await compare(password, user.password))) {
      throw new Error('Credenciais inválidas ou usuário não encontrado.')
    }

    const token = this.getToken(user.id)
    return { email: user.email, name: user.name, roles: user.roles, token }
  }

  private getToken(userId: string) {
    return sign({ id: userId }, environment.jwtPass, {
      expiresIn: '8h',
    })
  }
}
