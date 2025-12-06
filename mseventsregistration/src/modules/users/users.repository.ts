import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, tb_user } from '@prisma/client';
import { PRISMA_CLIENT } from 'src/core/constants';

@Injectable()
export class UsersRepository {
  constructor(@Inject(PRISMA_CLIENT) private readonly prisma: PrismaClient) {}

  async findById(id: string) {
    return await this.prisma.tb_user.findUnique({
      where: { id }
    });
  }

  async upsertUser(user: tb_user) {
    return this.prisma.tb_user.upsert({
      where: { id: user.id },
      update: { ...user },
      create: { ...user }
    });
  }
}
