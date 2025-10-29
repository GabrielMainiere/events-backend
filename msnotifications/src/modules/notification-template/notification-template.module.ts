import { Module } from '@nestjs/common';
import { NotificationTemplateService } from './notification-template.service';
import { NotificationTemplateResolver } from './notification-template.resolver';
import { NotificationTemplateRepository } from './notification-template.repository';
import { PrismaModule } from 'src/prisma-ds/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    NotificationTemplateRepository,
    NotificationTemplateService,
    NotificationTemplateResolver,
  ],
  exports: [NotificationTemplateService],
})
export class NotificationTemplateModule {}