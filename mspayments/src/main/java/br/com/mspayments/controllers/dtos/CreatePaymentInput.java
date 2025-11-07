package br.com.mspayments.controllers.dtos;

import br.com.mspayments.models.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatePaymentInput {
    private String eventId;
    private String userId;
    private PaymentMethod method;
    private PaymentGateway gateway;
    private String cardToken;
    private Integer installments;
    // brand do cartão
    private String paymentMethodId;

    public Payment toPayment(Event event, User user) {
        Payment payment = new Payment();
        payment.setEvent(event);
        payment.setUser(user);
        payment.setAmount(event.getPrice()); // Usando o preço do evento
        payment.setMethod(this.method);
        payment.setGateway(this.gateway);
        return payment;
    }
}
