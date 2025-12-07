import { PaymentStatus } from 'src/enum/payment-status'

export interface IPaymentUpdateRequest {
  eventId: string
  userId: string
  status: PaymentStatus
}
