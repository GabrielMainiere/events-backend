package br.com.mspayments.strategies.paymentMethod;

import br.com.mspayments.controllers.PaymentResponse;
import br.com.mspayments.strategies.paymentMethod.dtos.PaymentMethodData;
import br.com.mspayments.strategies.paymentGateway.PaymentGatewayStrategy;

public class CreditCardPaymentMethod implements PaymentMethodStrategy {

    @Override
    public PaymentResponse pay(PaymentGatewayStrategy gatewayStrategy, PaymentMethodData paymentData) {
        // Validação dos dados do cartão de crédito
        if (paymentData.getCardToken() == null || paymentData.getCardToken().isEmpty()) {
            throw new RuntimeException("Token do cartão é obrigatório para pagamentos com cartão de crédito");
        }

        // Processar pagamento com cartão de crédito
        var creditCardResponse = gatewayStrategy.processCreditCard(
            paymentData.getPayment(),
            paymentData.getCardToken(),
            paymentData.getPaymentMethodId()
        );

        return new PaymentResponse(paymentData.getPayment(), creditCardResponse);
    }
}
