import { tb_user } from '@prisma/client'
import { UsersRepository } from './infraestructure/users.repository'

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async findById(id: string) {
    return this.usersRepository.findById(id)
  }

  async upsertUser(userData: tb_user) {
    return this.usersRepository.upsertUser(userData)
  }
}
