import { Module } from '@nestjs/common'
import { prismaClient } from './database.provider'

@Module({
  providers: [prismaClient],
  exports: [prismaClient],
})
export class DatabaseModule {}
