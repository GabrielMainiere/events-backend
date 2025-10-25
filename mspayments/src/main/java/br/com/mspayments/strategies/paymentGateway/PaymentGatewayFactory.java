package br.com.mspayments.strategies.paymentGateway;

import br.com.mspayments.models.PaymentGateway;

import java.util.Map;

public class PaymentGatewayFactory {

    public static PaymentGatewayStrategy getPaymentGateway(PaymentGateway paymentGateway) {
        Map<PaymentGateway, PaymentGatewayStrategy> strategies = Map.of(
                PaymentGateway.STRIPE, new StripePaymentGateway()
        );
        return strategies.get(paymentGateway);
    }
}
