import { Module } from '@nestjs/common';
import { NotificationFactory } from './notification.factory';
import { StrategyModule } from '../strategy/strategy.module';
import { DecoratorModule } from '../decorator/decorator.module';

@Module({
  imports: [
    StrategyModule,
    DecoratorModule,
  ],
  providers: [NotificationFactory],
  exports: [NotificationFactory],
})
export class FactoryModule {}