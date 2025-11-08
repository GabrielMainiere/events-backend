import { Injectable, Logger } from '@nestjs/common';
import { NotificationChannel } from '@prisma/client';
import { IChannelStrategy } from './interfaces/iChannelStrategy';

@Injectable()
export class PushStrategy implements IChannelStrategy {
  public readonly channel = NotificationChannel.PUSH;
  private readonly logger = new Logger(PushStrategy.name);

  async send(recipient: string, subject: string, body: string): Promise<void> {
    this.logger.log(
      `[PUSH_SEND] Recipient: ${recipient} | Title: ${subject} | Body: ${body}`,
    );
    return Promise.resolve();
  }
}