import { Module } from '@nestjs/common';
import { NotificationStrategyProvider } from './notification-strategy.provider';
import { StrategyModule } from '../strategy.module';

@Module({
  imports: [StrategyModule],
  providers: [NotificationStrategyProvider],
  exports: [NotificationStrategyProvider],
})
export class NotificationStrategyProviderModule {}