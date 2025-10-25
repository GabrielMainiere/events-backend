package br.com.mspayments.strategies.paymentGateway;

import br.com.mspayments.models.Payment;

public interface PaymentGatewayStrategy {
    Payment processPix(Payment payment);
    Payment processCreditCard(Payment payment);
}
