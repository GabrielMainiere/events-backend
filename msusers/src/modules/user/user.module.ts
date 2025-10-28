import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { DatabaseModule } from '../database/database.module'
import { UserRepository } from './user.repository'

@Module({
  providers: [UserResolver, UserService, UserRepository],
  imports: [DatabaseModule],
})
export class UserModule {}
