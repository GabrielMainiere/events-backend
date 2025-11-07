import { Injectable, Logger } from '@nestjs/common';
import { INotificationStrategy } from 'src/common/interfaces/iNotificationStategy';

@Injectable()
export class SmsStrategy implements INotificationStrategy {
  private readonly logger = new Logger(SmsStrategy.name);

  async send(recipient: string, subject: string, body: string): Promise<void> {
    this.logger.log(
      `[SMS_SEND] Recipient: ${recipient} | Subject: ${subject} | Body: ${body}`,
    );
    return Promise.resolve();
  }
}