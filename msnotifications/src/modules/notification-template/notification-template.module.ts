import { Module } from '@nestjs/common';
import { NotificationTemplateService } from './notification-template.service';
import { NotificationTemplateResolver } from './notification-template.resolver';

@Module({
  providers: [NotificationTemplateService, NotificationTemplateResolver],
  exports: [NotificationTemplateService],
})
export class NotificationTemplateModule {}