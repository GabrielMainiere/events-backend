import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { DatabaseModule } from '../database/database.module'
import { UserRepository } from './user.repository'
import { UserController } from './user.grpc.controller'
import { NotificationsClientModule } from '../clients/notifications/notifications.client.module'

@Module({
  providers: [UserResolver, UserService, UserRepository],
  imports: [DatabaseModule, NotificationsClientModule],
  controllers: [UserController],
})
export class UserModule {}
