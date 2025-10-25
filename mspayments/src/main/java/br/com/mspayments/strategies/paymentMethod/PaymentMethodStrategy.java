package br.com.mspayments.strategies.paymentMethod;

import br.com.mspayments.models.Payment;
import br.com.mspayments.strategies.paymentGateway.PaymentGatewayStrategy;

public interface PaymentMethodStrategy {
    Payment pay(PaymentGatewayStrategy gatewayStrategy, Payment payment);
}
