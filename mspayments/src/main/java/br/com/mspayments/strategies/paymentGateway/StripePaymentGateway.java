package br.com.mspayments.strategies.paymentGateway;

import br.com.mspayments.models.Payment;
import br.com.mspayments.strategies.paymentGateway.dtos.PixResponse;

public class StripePaymentGateway implements PaymentGatewayStrategy {

    @Override
    public PixResponse processPix(Payment payment) {
        return null;
    }

    @Override
    public Payment processCreditCard(Payment payment) {
        return null;
    }
}
