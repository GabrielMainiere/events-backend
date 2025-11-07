export class SendEventNotificationDto {
  userId: string;
  recipientAddress: string;
  eventId: string;
  payloadJson: string;
  templateName: string;
}