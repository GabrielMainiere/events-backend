export interface AccountNotificationRequest {
  userId: string;
  recipientAddress: string;
  payloadJson: string;
  templateName?: string;
}