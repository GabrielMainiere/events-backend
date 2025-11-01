export interface EventNotificationRequest {
  userId: string;
  recipientAddress: string;
  eventId: string;
  payloadJson: string;
}