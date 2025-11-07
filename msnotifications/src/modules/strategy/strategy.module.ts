import { Module } from '@nestjs/common';
import { EmailStrategy } from './email.strategy';
import { SmsStrategy } from './sms.strategy';
import { PushStrategy } from './push.strategy';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [EmailModule],
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