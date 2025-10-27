package br.com.mspayments.controllers.dtos;

import br.com.mspayments.models.Payment;
import br.com.mspayments.models.PaymentGateway;
import br.com.mspayments.models.PaymentMethod;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatePaymentInput {
    private String eventId;
    private String userDocument;
    private Integer amount;
    private PaymentMethod method;
    private PaymentGateway gateway;
    private String cardToken;
    private Integer installments;
    // brand do cartão
    private String paymentMethodId;

    public Payment toPayment() {
        Payment payment = new Payment();
        payment.setEventId(this.eventId);
        payment.setUserDocument(this.userDocument);
        payment.setAmount(this.amount);
        payment.setMethod(this.method);
        payment.setGateway(this.gateway);
        return payment;
    }
}
