package br.com.mspayments.strategies.paymentGateway;

import br.com.mspayments.gateways.mercadopago.MercadoPagoClient;
import br.com.mspayments.gateways.mercadopago.dtos.MercadoPagoPixRequest;
import br.com.mspayments.gateways.mercadopago.mappers.MercadoPagoPixMapper;
import br.com.mspayments.models.Payment;
import br.com.mspayments.strategies.paymentGateway.dtos.PixResponse;
import lombok.AllArgsConstructor;

import java.util.Map;

@AllArgsConstructor
public class MercadoPagoPaymentGateway implements  PaymentGatewayStrategy {
    private final MercadoPagoClient mercadoPagoClient;

    public MercadoPagoPaymentGateway() {
        this.mercadoPagoClient = MercadoPagoClient.getInstance();
    }

    @Override
    public PixResponse processPix(Payment payment) {
        //regras de negocio do pix
        var payload = generateCreatePixPayload(payment);
        var mpPixResponse = mercadoPagoClient.createPixPayment(payload);
        return MercadoPagoPixMapper.toPixResponse(mpPixResponse);
    }

    @Override
    public Payment processCreditCard(Payment payment) {
        return null;
    }

    private static Map<String, Object> generateCreatePixPayload(Payment payment) {
        var request = new MercadoPagoPixRequest(payment);
        return Map.of(
                "transaction_amount", request.getTransactionAmount(),
                "description", request.getDescription(),
                "payment_method_id", "pix",
                "payer", Map.of("email", request.getPayerEmail())
        );
    }
}
