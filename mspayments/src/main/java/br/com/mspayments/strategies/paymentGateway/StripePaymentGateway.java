package br.com.mspayments.strategies.paymentGateway;

import br.com.mspayments.models.Payment;

public class StripePaymentGateway implements PaymentGatewayStrategy {

    @Override
    public Payment processPix(Payment payment) {
        return null;
    }

    @Override
    public Payment processCreditCard(Payment payment) {
        return null;
    }
}
