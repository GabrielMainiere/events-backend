import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationChannel } from '@prisma/client';
import { EmailStrategy } from '../strategy/email.strategy';
import { SmsStrategy } from '../strategy/sms.strategy';
import { PushStrategy } from '../strategy/push.strategy';
import { INotificationStrategy } from 'src/common/interfaces/iNotificationStategy';
import { AuditLogDecorator } from 'src/modules/decorator/audit-log.decorator';
import { PerformanceLogDecorator } from 'src/modules/decorator/performance-log.decorator';
import { RetryDecorator } from 'src/modules/decorator/retry.decorator';


@Injectable()
export class StrategyFactory {
  private readonly strategies = new Map<NotificationChannel, INotificationStrategy>();

  constructor(
    private readonly emailStrategy: EmailStrategy,
    private readonly smsStrategy: SmsStrategy,
    private readonly pushStrategy: PushStrategy,
  ) {
    this.registerStrategies();
  }


  private registerStrategies(): void {
    this.strategies.set(
      NotificationChannel.EMAIL,
      this.wrapWithDecorators(this.emailStrategy),
    );

    this.strategies.set(
      NotificationChannel.SMS,
      this.wrapWithDecorators(this.smsStrategy),
    );

    this.strategies.set(
      NotificationChannel.PUSH,
      this.wrapWithDecorators(this.pushStrategy),
    );
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