import { Module } from '@nestjs/common';
import { NotificationStrategyProvider } from './notification-strategy.provider';
import { StrategyModule } from '../strategy.module';
import { DecoratorModule } from '../../decorator/decorator.module';

@Module({
  imports: [
    StrategyModule,
    DecoratorModule,
  ],
  providers: [NotificationStrategyProvider],
  exports: [NotificationStrategyProvider],
})
export class NotificationStrategyProviderModule {}