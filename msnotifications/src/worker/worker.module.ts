import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { EmailModule } from 'src/modules/email/email.module';
import { NotificationTemplateModule } from 'src/modules/notification-template/notification-template.module';

@Module({
  imports: [
    EmailModule, 
    NotificationTemplateModule
  ],
  providers: [WorkerService],
})
export class WorkerModule {}