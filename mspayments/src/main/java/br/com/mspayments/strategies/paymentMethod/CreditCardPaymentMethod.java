package br.com.mspayments.strategies.paymentMethod;

import br.com.mspayments.controllers.PaymentResponse;
import br.com.mspayments.strategies.paymentMethod.dtos.PaymentMethodData;
import br.com.mspayments.strategies.paymentGateway.PaymentGatewayStrategy;

public class CreditCardPaymentMethod implements PaymentMethodStrategy {

    @Override
    public PaymentResponse pay(PaymentGatewayStrategy gatewayStrategy, PaymentMethodData paymentData) {
        String cardToken = paymentData.getCardToken();
        int installments = paymentData.getInstallments() != null ? paymentData.getInstallments() : 1;
        String paymentMethodId = paymentData.getPaymentMethodId();

        // Validações de negócio
        if (cardToken.equals("card_token_example") || cardToken.trim().isEmpty()) {
            throw new IllegalArgumentException("Token do cartão é obrigatório para pagamentos com cartão de crédito");
        }

        if (installments < 1 || installments > 12) {
            throw new IllegalArgumentException("Número de parcelas deve estar entre 1 e 12");
        }

        var creditCardResponse = gatewayStrategy.processCreditCard(
            paymentData.getPayment(),
            cardToken,
            installments,
            paymentMethodId
        );

        return new PaymentResponse(paymentData.getPayment(), creditCardResponse);
    }
}
