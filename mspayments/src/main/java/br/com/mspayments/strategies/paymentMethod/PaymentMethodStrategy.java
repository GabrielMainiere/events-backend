package br.com.mspayments.strategies.paymentMethod;

import br.com.mspayments.controllers.PaymentResponse;
import br.com.mspayments.strategies.paymentMethod.dtos.PaymentMethodData;
import br.com.mspayments.strategies.paymentGateway.PaymentGatewayStrategy;

public interface PaymentMethodStrategy {
    PaymentResponse pay(PaymentGatewayStrategy gatewayStrategy, PaymentMethodData paymentData);
}
