import { Module } from '@nestjs/common';
import { NotificationLogRepository } from './notification-log.repository';
import { PrismaModule } from 'src/prisma-ds/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    NotificationLogRepository,
  ],
  exports: [NotificationLogRepository],
})
export class NotificationLogModule {}