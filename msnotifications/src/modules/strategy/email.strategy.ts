import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { NotificationChannel } from '@prisma/client';
import { IChannelStrategy } from './interfaces/iChannelStrategy';

@Injectable()
export class EmailStrategy implements IChannelStrategy {
  public readonly channel = NotificationChannel.EMAIL;
  constructor(private readonly emailService: EmailService) {}

  async send(recipient: string, subject: string, body: string): Promise<void> {
    await this.emailService.sendMail(recipient, subject, body);
  }
}