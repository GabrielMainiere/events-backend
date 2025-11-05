import { Module } from '@nestjs/common'
import { NotificationsClientModule } from './notifications/notifications.client.module'

@Module({
  imports: [NotificationsClientModule],
  exports: [NotificationsClientModule],
})
export class GrpcClientsModule {}
