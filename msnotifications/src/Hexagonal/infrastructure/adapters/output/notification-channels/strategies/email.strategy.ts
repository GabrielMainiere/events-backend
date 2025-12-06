import { Inject, Injectable, Logger } from '@nestjs/common';
import type{ IEmailGateway } from 'src/Hexagonal/application/ports/output/email-gateway.port';
import { INotificationStrategy } from 'src/Hexagonal/application/ports/output/notification-strategy.port';
import { NotificationChannel } from 'src/Hexagonal/domain/enums/notification-channel.enum';

@Injectable()
export class EmailStrategy implements INotificationStrategy {
  private readonly logger = new Logger(EmailStrategy.name);

  readonly channel = NotificationChannel.EMAIL;

  constructor(
    @Inject('IEmailGateway')
    private readonly emailGateway: IEmailGateway,
  ) {}

  async send(recipientAddress: string, subject: string, body: string): Promise<void> {
    this.logger.log(`[EMAIL] Sending to: ${recipientAddress}`);
    
    await this.emailGateway.send(recipientAddress, subject, body);
    
    this.logger.log(`[EMAIL] Sent successfully to: ${recipientAddress}`);
  }
}