import { Module } from '@nestjs/common';
import { EmailStrategy } from './email.strategy';
import { SmsStrategy } from './sms.strategy';
import { EmailModule } from '../email/email.module';
import { NotificationTemplateModule } from '../notification-template/notification-template.module';
import { TemplateProcessorModule } from './template-processor/template-processor.module';

@Module({
  imports: [
    EmailModule,
    NotificationTemplateModule,
    TemplateProcessorModule,
  ],
  providers: [
    EmailStrategy,
    SmsStrategy,
  ],
  exports: [
    EmailStrategy,
    SmsStrategy,
  ],
})
export class StrategyModule {}