import { Injectable } from '@nestjs/common'

import { UserRepository } from './user.repository'
import { Prisma } from 'generated/prisma'
import { sign } from 'jsonwebtoken'

type UserCreateInput = Prisma.UserCreateInput
type UserUpdateInput = Prisma.UserUpdateInput
import { environment } from 'src/core/environment'
import { hash, compare } from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserInput: CreateUserDto) {
    const serializedCreateUserInput: UserCreateInput = {
      ...createUserInput,
      password: await this.getHashedPassword(createUserInput.password),
      roles: {
        connect: createUserInput.roles.map(roleId => ({ id: roleId })),
      },
    }

    const user = await this.userRepository.create(serializedCreateUserInput)
    const token = this.getToken(user.id, user.roles[0].name)
    return { email: user.email, name: user.name, roles: user.roles, token }
  }

  async findAll() {
    return await this.userRepository.findAll()
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id)
  }

  async update(id: string, updateUserInput: UpdateUserDto) {
    const serializedUpdateUserInput: UserUpdateInput = {
      ...updateUserInput,
      password: updateUserInput.password
        ? await this.getHashedPassword(updateUserInput.password)
        : undefined,
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

    const token = this.getToken(user.id, user.roles[0].name)
    return { email: user.email, name: user.name, roles: user.roles, token }
  }

  private getToken(userId: string, roleName: string) {
    return sign({ id: userId, roleName }, environment.jwtPass, {
      expiresIn: '8h',
    })
  }

  private async getHashedPassword(password: string) {
    return await hash(password, environment.saltRounds)
  }
}
