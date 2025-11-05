export class SendVerificationNotificationDto {
  userId: string
  recipientAddress: string
  payloadJson: string
  templateName?: string
}
