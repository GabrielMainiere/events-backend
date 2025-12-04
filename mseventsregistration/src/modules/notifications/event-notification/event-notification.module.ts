import { Module } from '@nestjs/common';
import { EventNotificationService } from './event-notification.service';
import { NotificationProducerModule } from './notification-producer.module';


@Module({
  imports: [
    NotificationProducerModule
  ],
  providers: [EventNotificationService],
  exports: [EventNotificationService], 
})
export class EventNotificationModule {}