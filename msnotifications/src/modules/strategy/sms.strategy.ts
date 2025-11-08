import { Injectable, Logger } from '@nestjs/common';
import { NotificationChannel } from '@prisma/client';
import { IChannelStrategy } from './interfaces/iChannelStrategy';

@Injectable()
export class SmsStrategy implements IChannelStrategy {
  public readonly channel = NotificationChannel.SMS;
  private readonly logger = new Logger(SmsStrategy.name);

  async send(recipient: string, subject: string, body: string): Promise<void> {
    this.logger.log(
      `[SMS_SEND] Recipient: ${recipient} | Subject: ${subject} | Body: ${body}`,
    );
    return Promise.resolve();
  }
}