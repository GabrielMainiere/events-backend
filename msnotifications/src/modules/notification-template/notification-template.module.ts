import { Module } from '@nestjs/common';
import { NotificationTemplateService } from './notification-template.service';
import { NotificationTemplateResolver } from './notification-template.resolver';
import { NotificationTemplateRepository } from './notification-template.repository';
import { PrismaModule } from 'src/prisma-ds/prisma.module';
import { NotificationTemplateValidator } from './notification-template-validator';

@Module({
  imports: [PrismaModule],
  providers: [
    NotificationTemplateRepository,
    NotificationTemplateService,
    NotificationTemplateValidator,
    NotificationTemplateResolver,
  ],
  exports: [
    NotificationTemplateService,
    NotificationTemplateValidator,
  ],
})
export class NotificationTemplateModule {}