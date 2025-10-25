package br.com.mspayments.strategies.paymentGateway;

import br.com.mspayments.models.Payment;
import br.com.mspayments.strategies.paymentGateway.dtos.PixResponse;

public interface PaymentGatewayStrategy {
    PixResponse processPix(Payment payment);
    Payment processCreditCard(Payment payment);
}
