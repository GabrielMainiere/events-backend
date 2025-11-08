package br.com.mspayments.gateways.mercadopago.dtos;

import br.com.mspayments.models.Payment;
import lombok.Data;

@Data
public class MercadoPagoCreditCardRequest {
    private final Double transactionAmount;
    private final String token;
    private final String description;
    private final String paymentMethodId;
    private final String payerEmail;
    private final Integer installments;

    public MercadoPagoCreditCardRequest(Payment payment, String token, String paymentMethodId) {
        // Usar o valor final convertido para a moeda especificada
        this.transactionAmount = payment.getFinalPrice() / 100.00;
        this.token = token;
        this.description = "Pagamento do evento " + payment.getEvent().getDescription() + " (" + payment.getCurrencyCode() + ")";
        this.paymentMethodId = paymentMethodId;
        this.payerEmail = payment.getUser().getEmail();
        this.installments = 1;
    }
}
