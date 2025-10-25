package br.com.mspayments.strategies.paymentMethod;

import br.com.mspayments.controllers.PaymentResponse;
import br.com.mspayments.models.Payment;
import br.com.mspayments.strategies.paymentGateway.PaymentGatewayStrategy;

public interface PaymentMethodStrategy {
    PaymentResponse pay(PaymentGatewayStrategy gatewayStrategy, Payment payment);
}
