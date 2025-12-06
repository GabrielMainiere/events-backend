import { Injectable } from '@nestjs/common';
import { tb_user } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async findById(id: string) {
    return this.usersRepository.findById(id);
  }

  async upsertUser(userData: tb_user) {
    return this.usersRepository.upsertUser(userData);
  }
}
