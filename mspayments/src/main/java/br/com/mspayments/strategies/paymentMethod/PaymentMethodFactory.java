package br.com.mspayments.strategies.paymentMethod;

import br.com.mspayments.models.PaymentMethod;

import java.util.Map;

import br.com.mspayments.controllers.dtos.CreatePaymentInput;
import br.com.mspayments.strategies.paymentMethod.dtos.PaymentMethodData;
import br.com.mspayments.models.Payment;

public class PaymentMethodFactory {

    public static PaymentMethodStrategy getPaymentMethod(PaymentMethod paymentMethod) {
        Map<PaymentMethod, PaymentMethodStrategy> strategies = Map.of(
                PaymentMethod.PIX, new PixPaymentMethod(),
                PaymentMethod.CREDIT_CARD, new CreditCardPaymentMethod()
        );

        return strategies.get(paymentMethod);
    }

    public static PaymentMethodData createPaymentMethodData(CreatePaymentInput input, Payment payment) {
        if (payment.getMethod() == PaymentMethod.CREDIT_CARD) {
            String cardToken = input.getCardToken();
            String paymentMethodId = input.getPaymentMethodId();

            return new PaymentMethodData(payment, cardToken, paymentMethodId);
        }
        return new PaymentMethodData(payment);
    }
}
