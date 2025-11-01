import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationChannel } from '@prisma/client';
import { EmailStrategy } from '../strategy/email.strategy';
import { INotificationStrategy } from 'src/interfaces/iNotificationStategy';
import { SmsStrategy } from '../strategy/sms.strategy';
import { LogNotificationDecorator } from '../decorator/log.decorator';

@Injectable()
export class NotificationFactory {
  private readonly strategies = new Map<NotificationChannel, INotificationStrategy>();

  constructor(
    private readonly emailStrategy: EmailStrategy,
    private readonly smsStrategy: SmsStrategy,
    private readonly logDecorator: LogNotificationDecorator,
  ) {

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

    this.logDecorator.setStrategy(strategy);
    return this.logDecorator;
  }
}