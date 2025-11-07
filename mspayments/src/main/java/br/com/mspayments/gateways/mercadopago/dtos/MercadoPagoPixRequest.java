package br.com.mspayments.gateways.mercadopago.dtos;

import br.com.mspayments.models.Payment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MercadoPagoPixRequest {
    private Double transactionAmount;
    private String description;
    private String payerEmail;

    public MercadoPagoPixRequest(Payment payment) {
        this.transactionAmount = payment.getAmount() / 100.0;
        this.description = "Pagamento do evento " + payment.getEvent().getDescription();
        this.payerEmail = payment.getUser().getEmail();
    }
}
