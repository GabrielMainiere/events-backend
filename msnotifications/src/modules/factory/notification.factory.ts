import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationChannel } from '@prisma/client';
import { EmailStrategy } from '../strategy/email.strategy';
import { INotificationStrategy } from 'src/interfaces/iNotificationStategy';
import { SmsStrategy } from '../strategy/sms.strategy';

@Injectable()
export class NotificationFactory {
  constructor(
    private readonly emailStrategy: EmailStrategy,
    private readonly smsStrategy: SmsStrategy,
  ) {}

  public getStrategy(channel: NotificationChannel): INotificationStrategy {
    switch (channel) {
      case NotificationChannel.EMAIL:
        return this.emailStrategy;
      case NotificationChannel.SMS:
        return this.smsStrategy;
      default:
        throw new NotFoundException(`Estratégia para o canal ${channel} não encontrada.`);
    }
  }
}