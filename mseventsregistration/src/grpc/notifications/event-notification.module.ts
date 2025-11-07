import { Module } from '@nestjs/common';
import { EventNotificationService } from './event-notification.service';
import { NotificationsModule } from 'src/grpc/notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  providers: [EventNotificationService],
  exports: [EventNotificationService], 
})
export class EventNotificationModule {}