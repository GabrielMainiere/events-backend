import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationChannel } from '@prisma/client';
import { EmailStrategy } from '../strategy/email.strategy';
import { INotificationStrategy } from 'src/interfaces/iNotificationStategy';
import { SmsStrategy } from '../strategy/sms.strategy';
import { PerformanceLogDecorator } from 'src/modules/decorator/performance-log.decorator';
import { AuditLogDecorator } from 'src/modules/decorator/audit-log.decorator';

@Injectable()
export class NotificationFactory {
  private readonly strategies = new Map<NotificationChannel, INotificationStrategy>();

  constructor(
    private readonly emailStrategy: EmailStrategy,
    private readonly smsStrategy: SmsStrategy,
    private readonly auditDecorator: AuditLogDecorator,
    private readonly performanceDecorator: PerformanceLogDecorator,
  ) {
    this.registerStrategies();
  }

  private registerStrategies(): void {
    this.strategies.set(NotificationChannel.EMAIL, this.emailStrategy);
    this.strategies.set(NotificationChannel.SMS, this.smsStrategy);
  }

  public getStrategy(channel: NotificationChannel): INotificationStrategy {
    const strategy = this.strategies.get(channel);

    if (!strategy) {
      throw new NotFoundException(
        `Estratégia para o canal ${channel} não encontrada.`,
      );
    }

    return this.wrapWithDecorators(strategy);
  }

  private wrapWithDecorators(strategy: INotificationStrategy): INotificationStrategy {
    this.auditDecorator.setStrategy(strategy);
    this.performanceDecorator.setStrategy(this.auditDecorator);
    return this.performanceDecorator;
  }
}