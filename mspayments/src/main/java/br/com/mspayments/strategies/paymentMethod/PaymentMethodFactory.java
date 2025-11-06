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
    public static PaymentMethodData createPaymentMethodData(CreatePaymentInput input, br.com.mspayments.models.Event event, br.com.mspayments.models.User user) {
        Payment payment = input.toPayment(event, user);

        if (payment.getMethod() == PaymentMethod.CREDIT_CARD) {
            String cardToken = input.getCardToken();
            Integer installments = input.getInstallments() != null ? input.getInstallments() : 1;
            String paymentMethodId = input.getPaymentMethodId();

            return new PaymentMethodData(payment, cardToken, installments, paymentMethodId);
        }
        return new PaymentMethodData(payment);
    }
}
