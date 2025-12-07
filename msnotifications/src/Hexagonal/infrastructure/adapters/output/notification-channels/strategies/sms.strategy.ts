import { Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { INotificationStrategy } from 'src/Hexagonal/application/ports/output/notification-strategy.port';
import { NotificationChannel } from 'src/Hexagonal/domain/enums/notification-channel.enum';

@Injectable()
export class SMSStrategy implements INotificationStrategy {
  private readonly logger = new Logger(SMSStrategy.name);

  readonly channel = NotificationChannel.SMS;

  async send(recipientAddress: string, subject: string, body: string): Promise<void> {
    this.logger.warn(`[SMS] Not implemented yet - phone: ${recipientAddress}`);
    
    throw new NotImplementedException('SMS channel not implemented yet');
  }
}