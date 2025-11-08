import { NotificationTemplate } from '@prisma/client';

export interface EnqueueNotificationInput {
  userId: string;
  templateName: string;
  template: NotificationTemplate;
  recipientAddress: string;
  payloadJson: string;
}

export interface EnqueueNotificationOutput {
  notificationId: string;
  status: string;
}

export interface INotificationEnqueuer {
  enqueue(data: EnqueueNotificationInput): Promise<EnqueueNotificationOutput>;
}