import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'

import { UserRepository } from './user.repository'
import { Prisma, User, Role } from 'generated/prisma'
import { sign } from 'jsonwebtoken'

type UserCreateInput = Prisma.UserCreateInput
type UserUpdateInput = Prisma.UserUpdateInput
import { environment } from 'src/core/environment'
import { hash, compare } from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { NotificationsClientService } from '../clients/notifications/notifications.client.service'
import { NotificationsTemplateNames } from 'src/core/enums'
import { randomInt } from 'node:crypto'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly notificationsClientService: NotificationsClientService
  ) {}

  async create(createUserInput: CreateUserDto) {
    const serializedCreateUserInput: UserCreateInput = {
      ...createUserInput,
      password: await this.getHashedPassword(createUserInput.password),
      roles: {
        connect: createUserInput.roles.map(roleId => ({ id: roleId })),
      },
      activationCode: randomInt(100000, 999999).toString(),
    }

    const user = await this.userRepository.create(serializedCreateUserInput)

    await this.sendActivationEmail(user)
    return {
      id: user.id,
      message:
        'Um código de ativação foi enviado para o seu e-mail. Por favor, verifique sua caixa de entrada.',
    }
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
      throw new BadRequestException('Credenciais inválidas ou usuário não encontrado.')
    }

    const token = this.getToken(user.id, user.roles)
    return { id: user.id, email: user.email, name: user.name, roles: user.roles, token }
  }

  async activate(id: string, activationCode: string) {
    const user = await this.userRepository.activate(id, activationCode)
    if (!user) throw new NotFoundException('Código de ativação inválido ou usuário não encontrado.')

    const token = this.getToken(user.id, user.roles)
    return { id: user.id, email: user.email, name: user.name, roles: user.roles, token }
  }

  private getToken(userId: string, roles: Role[]) {
    return sign(
      {
        iss: 'events-api',
        id: userId,
        roleNames: roles.map(role => role.name),
      },
      environment.jwtPass,
      {
        expiresIn: '8h',
      }
    )
  }

  private async getHashedPassword(password: string) {
    return await hash(password, environment.saltRounds)
  }

  private async sendActivationEmail(user: User) {
    await this.notificationsClientService.sendVerificationNotification({
      userId: user.id,
      recipientAddress: user.email,
      payloadJson: JSON.stringify({ name: user.name, userActivationCode: user.activationCode }),
      templateName: NotificationsTemplateNames.ACCOUNT_VERIFICATION_EMAIL,
    })
  }
}
