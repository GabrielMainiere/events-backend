export class SendRegistrationNotificationDto {
  userId: string;
  recipientAddress: string;
  eventId: string;
  payloadJson: string;
  templateName?: string;
}