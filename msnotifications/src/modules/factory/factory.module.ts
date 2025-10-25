import { Module } from '@nestjs/common';
import { NotificationFactory } from './notification.factory';
import { StrategyModule } from '../strategy/strategy.module';

@Module({
  imports: [
    StrategyModule,
  ],
  providers: [NotificationFactory],
  exports: [NotificationFactory],
})
export class FactoryModule {}