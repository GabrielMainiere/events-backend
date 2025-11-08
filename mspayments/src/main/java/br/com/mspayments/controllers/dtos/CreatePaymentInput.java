package br.com.mspayments.controllers.dtos;

import br.com.mspayments.models.*;
import br.com.mspayments.services.CurrencyConversionService;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
public class CreatePaymentInput {
    private String eventId;
    private String userId;
    private PaymentMethod method;
    private PaymentGateway gateway;
    private String currencyCode; // código da moeda (USD, EUR, BRL)
    private String cardToken;
    // brand do cartão
    private String paymentMethodId;

    public Payment toPayment(Event event, User user, CurrencyConversionService currencyConversionService) {
        Payment payment = new Payment();
        payment.setEvent(event);
        payment.setUser(user);
        payment.setAmount(event.getPrice()); // Valor original do evento (compatibilidade)

        // Define a moeda padrão como BRL se não especificada
        String targetCurrency = this.currencyCode != null ? this.currencyCode.toUpperCase() : "BRL";

        // Preço base sempre em BRL (do evento)
        payment.setBasePrice(event.getPrice());

        // Converte o preço para a moeda especificada
        Integer finalPrice = currencyConversionService.convertFromBRL(event.getPrice(), targetCurrency);
        payment.setFinalPrice(finalPrice);
        payment.setCurrencyCode(targetCurrency);

        payment.setMethod(this.method);
        payment.setGateway(this.gateway);
        payment.setStatus(PaymentStatus.PENDING);
        payment.setCreatedAt(Instant.now());

        return payment;
    }
}
