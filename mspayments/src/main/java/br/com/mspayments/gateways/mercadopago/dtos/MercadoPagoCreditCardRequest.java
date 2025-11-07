package br.com.mspayments.gateways.mercadopago.dtos;

import br.com.mspayments.models.Payment;
import lombok.Data;

@Data
public class MercadoPagoCreditCardRequest {
    private final Double transactionAmount;
    private final String token;
    private final String description;
    private final Integer installments;
    private final String paymentMethodId;
    private final String payerEmail;

    public MercadoPagoCreditCardRequest(Payment payment, String token, Integer installments, String paymentMethodId) {
        this.transactionAmount = payment.getAmount() / 100.00;
        this.token = token;
        this.description = "Pagamento do evento " + payment.getEvent().getDescription();
        this.installments = installments;
        this.paymentMethodId = paymentMethodId;
        this.payerEmail = payment.getUser().getEmail();
    }
}
