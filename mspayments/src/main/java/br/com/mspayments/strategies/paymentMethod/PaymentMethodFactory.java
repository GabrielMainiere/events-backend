package br.com.mspayments.strategies.paymentMethod;

import br.com.mspayments.models.PaymentMethod;
import br.com.mspayments.strategies.paymentGateway.PaymentGatewayStrategy;

import java.util.Map;

public class PaymentMethodFactory {

    public static PaymentMethodStrategy getPaymentMethod(PaymentMethod paymentMethod) {
        Map<PaymentMethod, PaymentMethodStrategy> strategies = Map.of(
                PaymentMethod.PIX, new PixPaymentMethod()
        );

        return strategies.get(paymentMethod);
    }
}
