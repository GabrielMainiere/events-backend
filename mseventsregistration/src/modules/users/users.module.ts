import { Module } from '@nestjs/common'
import { UsersClient } from './client/userClient'
import { DatabaseModule } from '../database/prisma.module'
import { UsersService } from './users.service'
import { UsersRepository } from './infraestructure/users.repository'

@Module({
  imports: [DatabaseModule],
  providers: [UsersClient, UsersRepository, UsersService],
  exports: [UsersClient, UsersService]
})
export class UsersModule {}
