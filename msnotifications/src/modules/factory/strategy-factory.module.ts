import { Module } from '@nestjs/common';
import { StrategyFactory } from './strategy-factory';
import { StrategyModule } from '../strategy/strategy.module';


@Module({
  imports: [StrategyModule],
  providers: [StrategyFactory],
  exports: [StrategyFactory],
})
export class StrategyFactoryModule {}