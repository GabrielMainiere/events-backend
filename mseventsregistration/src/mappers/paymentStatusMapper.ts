export class PaymentStatusMapper {

    static map(status: number | 'ACCEPTED' | 'REJECTED'): 'ACCEPTED' | 'REJECTED' {
        if (typeof status === 'number') {
            return status === 0 ? 'ACCEPTED' : 'REJECTED';
        }
        
        if (status === 'ACCEPTED' || status === 'REJECTED') {
            return status;
        }
        throw new Error(`Invalid payment status: ${status}`);
    }
}
