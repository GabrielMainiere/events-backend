import { Module } from '@nestjs/common'
import { RoleService } from './role.service'
import { RoleResolver } from './role.resolver'
import { RoleRepository } from './role.repository'
import { DatabaseModule } from '../database/database.module'

@Module({
  providers: [RoleResolver, RoleService, RoleRepository],
  imports: [DatabaseModule],
})
export class RoleModule {}
