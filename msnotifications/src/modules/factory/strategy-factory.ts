import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NotificationChannel } from '@prisma/client';
import { AuditLogDecorator } from 'src/modules/decorator/audit-log.decorator';
import { PerformanceLogDecorator } from 'src/modules/decorator/performance-log.decorator';
import { RetryDecorator } from 'src/modules/decorator/retry.decorator';
import { IStrategyFactory } from './interfaces/iStrategyFactory';
import { INotificationStrategy } from '../strategy/interfaces/iNotificationStrategy';
import { NOTIFICATION_STRATEGIES } from '../strategy/interfaces/constants';
import { IChannelStrategy } from '../strategy/interfaces/iChannelStrategy';


@Injectable()
export class StrategyFactory implements IStrategyFactory {
  private readonly strategies = new Map<NotificationChannel, INotificationStrategy>();

  constructor(
    @Inject(NOTIFICATION_STRATEGIES)
    private readonly allStrategies: IChannelStrategy[],
  ) {
    this.registerStrategies();
  }

  private registerStrategies(): void {
    for (const strategy of this.allStrategies) {
      this.strategies.set(
        strategy.channel,
        this.wrapWithDecorators(strategy),
      );
    }
  }

  public getStrategy(channel: NotificationChannel): INotificationStrategy {
    const strategy = this.strategies.get(channel);

    if (!strategy) {
      throw new NotFoundException(
        `Strategy for channel ${channel} not found.`,
      );
    }

    return strategy;
  }

  private wrapWithDecorators(strategy: INotificationStrategy): INotificationStrategy {
    const withRetry = new RetryDecorator(strategy, 3, 1000);
    const withAudit = new AuditLogDecorator(withRetry);
    const withPerformance = new PerformanceLogDecorator(withAudit);

    return withPerformance;
  }
}