export interface ProcessNotificationInput {
  userId: string;
  recipientAddress: string;
  templateName: string;
  payloadJson: string;
}