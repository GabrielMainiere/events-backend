package br.com.mspayments.strategies.paymentMethod;

import br.com.mspayments.controllers.PaymentResponse;
import br.com.mspayments.models.Payment;
import br.com.mspayments.strategies.paymentGateway.PaymentGatewayStrategy;

public class PixPaymentMethod implements PaymentMethodStrategy {

    @Override
    public PaymentResponse pay(PaymentGatewayStrategy gatewayStrategy, Payment payment) {
        //regras de negocio para implementar o pix
        var pixResponse = gatewayStrategy.processPix(payment);

        return new PaymentResponse(payment, pixResponse);
    }
}
