import { Module } from '@nestjs/common';
import { prismaClient } from './prisma.provider';
@Module({
  providers: [prismaClient],
  exports: [prismaClient]
})
export class DatabaseModule {}
