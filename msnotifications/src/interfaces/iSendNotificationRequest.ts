export interface ISendNotificationRequest {
  userId: string;
  templateName: string;
  recipientAddress: string;
  payloadJson: string;
}