import { PaymentStatus } from 'src/enum/payment-status'

export class PaymentStatusMapper {
  static map(status: PaymentStatus): PaymentStatus {
    if (status === 'ACCEPTED' || status === 'REJECTED') {
      return status
    }
    throw new Error(`Invalid payment status: ${status}`)
  }
}
