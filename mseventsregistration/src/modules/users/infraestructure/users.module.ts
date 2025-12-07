import { Module } from '@nestjs/common'
import { UsersClient } from './grpc/userClient'
import { DatabaseModule } from '../../database/prisma.module'
import { UsersRepository } from './users.repository'

@Module({
  imports: [DatabaseModule],
  providers: [UsersClient, UsersRepository],
  exports: [UsersClient, UsersRepository]
})
export class UsersModule {}
