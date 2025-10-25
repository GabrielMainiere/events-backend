import { Module } from '@nestjs/common';
import { NotificationLogModule } from 'src/modules/notification-log/notification-log.module';
import { NotificationTemplateModule } from 'src/modules/notification-template/notification-template.module';
import { NotificationImplementation } from './notification.implementation';


@Module({
  imports: [
    NotificationLogModule, 
    NotificationTemplateModule,
  ],
  controllers: [NotificationImplementation],
})
export class NotificationImplementationModule {}