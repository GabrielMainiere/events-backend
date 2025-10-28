export interface ISendNotificationRequest {
  userId: string;
  templateId: string;
  recipientAddress: string;
  payloadJson: string;
}