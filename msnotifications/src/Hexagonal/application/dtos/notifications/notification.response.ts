export class NotificationResponse {
  id: string;
  userId: string;
  notificationType: string;
  channel: string;
  recipientAddress: string;
  templateName: string;
  status: string;
  sentAt?: Date;
  errorMessage?: string;
  retryCount: number;
  createdAt: Date;

  constructor(data: Partial<NotificationResponse>) {
    Object.assign(this, data);
  }
}