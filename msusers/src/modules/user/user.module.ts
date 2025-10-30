import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { DatabaseModule } from '../database/database.module'
import { UserRepository } from './user.repository'
import { UserController } from './user.grpc.controller'

@Module({
  providers: [UserResolver, UserService, UserRepository],
  imports: [DatabaseModule],
  controllers: [UserController],
})
export class UserModule {}
