import { Injectable } from '@nestjs/common';
import { INotificationStrategy } from 'src/common/interfaces/iNotificationStategy';
import { EmailService } from '../email/email.service';

@Injectable()
export class EmailStrategy implements INotificationStrategy {
  constructor(private readonly emailService: EmailService) {}

  async send(recipient: string, subject: string, body: string): Promise<void> {
    await this.emailService.sendMail(recipient, subject, body);
  }
}