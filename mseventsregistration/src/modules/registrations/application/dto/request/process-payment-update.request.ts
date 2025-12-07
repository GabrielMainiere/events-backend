import { IsEnum } from 'class-validator'
import { PaymentStatus } from 'src/enum/payment-status'

export class ProcessPaymentUpdateRequest {
  eventId: string
  userId: string

  @IsEnum(PaymentStatus, {
    message: `status must be one of: ${Object.values(PaymentStatus).join(', ')}`
  })
  status: PaymentStatus
}
