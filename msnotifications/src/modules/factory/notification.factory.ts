import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationChannel } from '@prisma/client';
import { EmailStrategy } from '../strategy/email.strategy';
import { INotificationStrategy } from 'src/interfaces/iNotificationStategy';
import { SmsStrategy } from '../strategy/sms.strategy';
import { LogNotificationDecorator } from '../decorator/log.decorator';

@Injectable()
export class NotificationFactory {
  constructor(
    private readonly emailStrategy: EmailStrategy,
    private readonly smsStrategy: SmsStrategy,
    private readonly logDecorator: LogNotificationDecorator,
  ) {}

  public getStrategy(channel: NotificationChannel): INotificationStrategy {
    let strategy: INotificationStrategy;
    
    switch (channel) {
      case NotificationChannel.EMAIL:
        strategy = this.emailStrategy;
        break;
      case NotificationChannel.SMS:
        strategy = this.smsStrategy;
        break;
      default:
        throw new NotFoundException(`Estratégia para o canal ${channel} não encontrada.`);
    }

    this.logDecorator.setStrategy(strategy);
    return this.logDecorator;
  }
}