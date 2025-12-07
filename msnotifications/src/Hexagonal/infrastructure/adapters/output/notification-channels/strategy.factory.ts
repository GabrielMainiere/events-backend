import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NotificationChannel } from '../../../../domain/enums/notification-channel.enum';
import type { INotificationStrategy } from '../../../../application/ports/output/notification-strategy.port';
import type { IStrategyFactory } from '../../../../application/ports/output/strategy-factory.port';
import { RetryDecorator } from './decorators/retry.decorator';
import { AuditLogDecorator } from './decorators/audit-log.decorator';
import { PerformanceLogDecorator } from './decorators/performance-log.decorator';

export const NOTIFICATION_STRATEGIES = 'NOTIFICATION_STRATEGIES';

@Injectable()
export class StrategyFactory implements IStrategyFactory {
  private readonly strategies = new Map<NotificationChannel, INotificationStrategy>();

  constructor(
    @Inject(NOTIFICATION_STRATEGIES)
    private readonly allStrategies: INotificationStrategy[],
  ) {
    this.registerStrategies();
  }

  private registerStrategies(): void {
    for (const strategy of this.allStrategies) {
      this. strategies.set(
        strategy.channel,
        this.wrapWithDecorators(strategy),
      );
    }
  }

  public getStrategy(channel: NotificationChannel): INotificationStrategy {
    const strategy = this.strategies.get(channel);

    if (!strategy) {
      throw new NotFoundException(
        `Strategy for channel ${channel} not found. Available channels: ${Array.from(this. strategies.keys()).join(', ')}`
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