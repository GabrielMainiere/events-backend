import { Module } from '@nestjs/common';
import { NotificationsClientService } from './notifications.client.service';

@Module({
  providers: [NotificationsClientService],
  exports: [NotificationsClientService],
})
export class NotificationsModule {}