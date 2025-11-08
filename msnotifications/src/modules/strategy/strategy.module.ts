import { Module } from '@nestjs/common';
import { EmailStrategy } from './email.strategy';
import { SmsStrategy } from './sms.strategy';
import { PushStrategy } from './push.strategy';
import { EmailModule } from '../email/email.module';
import { NOTIFICATION_STRATEGIES } from './interfaces/constants';

const allStrategyClasses = [EmailStrategy, SmsStrategy, PushStrategy];

@Module({
  imports: [EmailModule],
  providers: [
    ...allStrategyClasses,
    {
      provide: NOTIFICATION_STRATEGIES,
      useFactory: (...strategies) => {
        return strategies;
      },
      inject: allStrategyClasses,
    },
  ],
  exports: [NOTIFICATION_STRATEGIES],
})
export class StrategyModule {}