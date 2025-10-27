package br.com.mspayments.controllers;


import br.com.mspayments.models.Payment;
import br.com.mspayments.strategies.paymentGateway.dtos.CreditCardResponse;
import br.com.mspayments.strategies.paymentGateway.dtos.PixResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponse {
    private Payment payment;
    private PixResponse pixData;
    private CreditCardResponse creditCardData;

    public PaymentResponse(Payment payment) {
        this.payment = payment;
    }
    // Construtor para PIX
    public PaymentResponse(Payment payment, PixResponse pixData) {
        this.payment = payment;
        this.pixData = pixData;
    }

    // Construtor para cartão de crédito
    public PaymentResponse(Payment payment, CreditCardResponse creditCardData) {
        this.payment = payment;
        this.creditCardData = creditCardData;
    }
}
