package br.com.mspayments.strategies.paymentMethod;

import br.com.mspayments.controllers.PaymentResponse;
import br.com.mspayments.strategies.paymentMethod.dtos.PaymentMethodData;
import br.com.mspayments.strategies.paymentGateway.PaymentGatewayStrategy;

public class PixPaymentMethod implements PaymentMethodStrategy {

    @Override
    public PaymentResponse pay(PaymentGatewayStrategy gatewayStrategy, PaymentMethodData paymentData) {
        // Validação: PIX só aceita pagamentos em BRL
        if (!"BRL".equalsIgnoreCase(paymentData.getPayment().getCurrencyCode())) {
            throw new RuntimeException("PIX só aceita pagamentos em Real Brasileiro (BRL). Moeda informada: " + paymentData.getPayment().getCurrencyCode());
        }

        var pixResponse = gatewayStrategy.processPix(paymentData.getPayment());

        return new PaymentResponse(paymentData.getPayment(), pixResponse);
    }
}
