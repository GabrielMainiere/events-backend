package br.com.mspayments.strategies.paymentMethod;

import br.com.mspayments.controllers.PaymentResponse;
import br.com.mspayments.strategies.paymentMethod.dtos.PaymentMethodData;
import br.com.mspayments.strategies.paymentGateway.PaymentGatewayStrategy;

public class PixPaymentMethod implements PaymentMethodStrategy {

    @Override
    public PaymentResponse pay(PaymentGatewayStrategy gatewayStrategy, PaymentMethodData paymentData) {
        //regras de negocio para implementar o pix
        var pixResponse = gatewayStrategy.processPix(paymentData.getPayment());

        return new PaymentResponse(paymentData.getPayment(), pixResponse);
    }
}
