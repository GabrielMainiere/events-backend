export interface PaymentNotificationRequest {
  userId: string;
  recipientAddress: string;
  paymentId: string;
  payloadJson: string;
  templateName: string;
}