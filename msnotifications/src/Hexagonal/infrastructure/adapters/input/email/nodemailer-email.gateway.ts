
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { IEmailGateway } from '../../../../application/ports/output/email-gateway.port';

@Injectable()
export class NodemailerEmailGateway implements IEmailGateway {
  private transport: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService. get<string>('GMAIL_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async send(recipientAddress: string, subject: string, body: string): Promise<void> {
    try {
      const info = await this.transport.sendMail({
        from: `"Notification Service" <${this.configService. get<string>('GMAIL_USER')}>`,
        to: recipientAddress,
        subject: subject,
        html: body,
      });
      
    } catch (error) {
      throw new Error(`Email sending failed: ${error.message}`);
    }
  }
}