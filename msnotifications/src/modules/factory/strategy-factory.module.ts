import { Module } from '@nestjs/common';
import { StrategyFactory } from './strategy-factory';
import { StrategyModule } from '../strategy/strategy.module';

@Module({
  imports: [StrategyModule],
  providers: [
    {
      provide: 'IStrategyFactory',
      useClass: StrategyFactory,
    },
  ],
  exports: [
    'IStrategyFactory',
  ],
})
export class StrategyFactoryModule {}