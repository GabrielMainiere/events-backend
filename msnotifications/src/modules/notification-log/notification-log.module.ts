import { Module } from '@nestjs/common';
import { NotificationLogService } from './notification-log.service';

@Module({
  providers: [NotificationLogService],
  exports: [NotificationLogService],
})
export class NotificationLogModule {}