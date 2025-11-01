import { Injectable, Logger } from '@nestjs/common';
import { INotificationStrategy } from 'src/common/interfaces/iNotificationStategy';
import { NotificationLog } from '@prisma/client';

@Injectable()
export class SmsStrategy implements INotificationStrategy {
  private readonly logger = new Logger(SmsStrategy.name);

  async send(notification: NotificationLog): Promise<void> {
    this.logger.log(
      `MOCK Enviando SMS para: ${
        notification.recipient_address
      } com payload: ${JSON.stringify(notification.payload)}`,
    );

    return Promise.resolve();
  }
}