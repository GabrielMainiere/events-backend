export class PaymentStatusMapper {

    static map(status:'ACCEPTED' | 'REJECTED'): 'ACCEPTED' | 'REJECTED' {
    
        if (status === 'ACCEPTED' || status === 'REJECTED') {
            return status;
        }
        throw new Error(`Invalid payment status: ${status}`);
    }
}
