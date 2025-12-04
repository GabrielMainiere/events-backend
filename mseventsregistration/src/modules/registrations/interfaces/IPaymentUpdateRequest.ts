export interface IPaymentUpdateRequest {
    eventId: string;
    userId: string;
    status: 'ACCEPTED' | 'REJECTED';
}