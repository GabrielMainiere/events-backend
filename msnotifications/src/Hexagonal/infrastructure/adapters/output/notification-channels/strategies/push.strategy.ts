import { Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { INotificationStrategy } from 'src/Hexagonal/application/ports/output/notification-strategy.port';
import { NotificationChannel } from 'src/Hexagonal/domain/enums/notification-channel.enum';

@Injectable()
export class PushStrategy implements INotificationStrategy {
  private readonly logger = new Logger(PushStrategy.name);

  readonly channel = NotificationChannel.PUSH;

  async send(recipientAddress: string, subject: string, body: string): Promise<void> {
    this.logger.warn(`[PUSH] Not implemented yet - device: ${recipientAddress}`);
    
    throw new NotImplementedException('Push channel not implemented yet');
  }
}