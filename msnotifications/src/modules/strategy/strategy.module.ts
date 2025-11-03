import { Module } from '@nestjs/common';
import { EmailStrategy } from './email.strategy';
import { SmsStrategy } from './sms.strategy';
import { EmailModule } from '../email/email.module';
import { NotificationTemplateModule } from '../notification-template/notification-template.module';
import { TemplateProcessorModule } from './template-processor/template-processor.module';
import { PushStrategy } from './push.strategy';

@Module({
  imports: [
    EmailModule,
    NotificationTemplateModule,
    TemplateProcessorModule,
  ],
  providers: [
    EmailStrategy,
    SmsStrategy,
    PushStrategy,
  ],
  exports: [
    EmailStrategy,
    SmsStrategy,
    PushStrategy,
  ],
})
export class StrategyModule {}