import { Injectable, Logger } from '@nestjs/common';
import { INotificationStrategy } from 'src/common/interfaces/iNotificationStategy';

@Injectable()
export class PushStrategy implements INotificationStrategy {
  private readonly logger = new Logger(PushStrategy.name);

  async send(recipient: string, subject: string, body: string): Promise<void> {
    this.logger.log(
      `[PUSH_SEND] Recipient: ${recipient} | Title: ${subject} | Body: ${body}`,
    );
    return Promise.resolve();
  }
}