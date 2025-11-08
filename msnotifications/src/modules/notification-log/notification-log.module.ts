import { Module } from '@nestjs/common';
import { NotificationLogRepository } from './notification-log.repository';

@Module({
  providers: [
    NotificationLogRepository,
    {
      provide: 'INotificationLogRepository',
      useClass: NotificationLogRepository,
    },
  ],
  exports: [
    'INotificationLogRepository',
    NotificationLogRepository, 
  ],
})
export class NotificationLogModule {}