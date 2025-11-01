import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transport;

  constructor(private readonly configService: ConfigService) {
    this.transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASSWORD'),
      },
    });
  }

  async sendMail(to: string, subject: string, body: string) {
    await this.transport.sendMail({
      from: `"Events Project" <${this.configService.get<string>('GMAIL_USER')}>`,
      to: to,
      subject: subject,
      html: body,
    });
  }
}