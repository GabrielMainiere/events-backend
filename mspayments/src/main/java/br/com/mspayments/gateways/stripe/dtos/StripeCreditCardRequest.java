package br.com.mspayments.gateways.stripe.dtos;

import br.com.mspayments.models.Payment;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class StripeCreditCardRequest {
    private BigDecimal amount;
    private String currency;
    private String source;
    private String description;
    private String receiptEmail;

    public StripeCreditCardRequest(Payment payment, String cardToken) {
        this.amount = BigDecimal.valueOf(payment.getAmount());
        this.currency = "brl";
        this.source = cardToken;
//        this.description = payment.getDescription();
//        this.receiptEmail = payment.getPayerEmail();
    }
}
