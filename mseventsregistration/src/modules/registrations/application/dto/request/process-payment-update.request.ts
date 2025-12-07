import { PaymentStatus } from 'src/enum/payment-status'

export class ProcessPaymentUpdateRequest {
  eventId: string
  userId: string
  status: PaymentStatus
}
