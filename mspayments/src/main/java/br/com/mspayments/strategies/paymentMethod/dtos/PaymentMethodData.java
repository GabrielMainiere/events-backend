package br.com.mspayments.strategies.paymentMethod.dtos;

import br.com.mspayments.controllers.dtos.CreatePaymentInput;
import br.com.mspayments.models.Payment;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PaymentMethodData {
    private Payment payment;
    private String cardToken;
    private Integer installments;
    private String paymentMethodId;

    // Construtor para PIX
    public PaymentMethodData(Payment payment) {
        this.payment = payment;
    }

    // Construtor para cartão de crédito
    public PaymentMethodData(Payment payment, String cardToken, Integer installments, String paymentMethodId) {
        this.payment = payment;
        this.cardToken = cardToken;
        this.installments = installments;
        this.paymentMethodId = paymentMethodId;
    }

    public static PaymentMethodData fromCreatePaymentInput(CreatePaymentInput input) {
        Payment payment = input.toPayment();
        return new PaymentMethodData(
            payment,
            input.getCardToken(),
            input.getInstallments(),
            input.getPaymentMethodId()
        );
    }
}
