package br.com.mspayments.strategies.paymentGateway;

import br.com.mspayments.gateways.mercadopago.MercadoPagoClient;
import br.com.mspayments.models.Payment;
import br.com.mspayments.strategies.paymentGateway.dtos.PixResponse;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class MercadoPagoPaymentGateway implements  PaymentGatewayStrategy {
    private final MercadoPagoClient mercadoPagoClient;

    public MercadoPagoPaymentGateway() {
        this.mercadoPagoClient = MercadoPagoClient.getInstance();
    }

    @Override
    public PixResponse processPix(Payment payment) {
        //regras de negocio do pix
        return mercadoPagoClient.createPixPayment(payment);
    }

    @Override
    public Payment processCreditCard(Payment payment) {
        return null;
    }
}
