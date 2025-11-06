import { Module } from '@nestjs/common';
import { NotificationsClientService } from './client/notifications.client.service';

@Module({
  providers: [NotificationsClientService],
  exports: [NotificationsClientService],
})
export class NotificationsModule {}