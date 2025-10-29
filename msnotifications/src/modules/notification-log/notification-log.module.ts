import { Module } from '@nestjs/common';
import { NotificationLogService } from './notification-log.service';
import { NotificationLogRepository } from './notification-log.repository';
import { PrismaModule } from 'src/prisma-ds/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    NotificationLogRepository,
    NotificationLogService,
  ],
  exports: [NotificationLogService],
})
export class NotificationLogModule {}