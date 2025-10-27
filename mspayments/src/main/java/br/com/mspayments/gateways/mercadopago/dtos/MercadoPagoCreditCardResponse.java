package br.com.mspayments.gateways.mercadopago.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MercadoPagoCreditCardResponse {
    private String id;
    private String status;

    @Data
    @NoArgsConstructor
    public static class Card {
        private String lastFourDigits;
        private String firstSixDigits;
        private String expirationMonth;
        private String expirationYear;
        private String cardholderName;
        private PaymentMethod paymentMethod;

        @Data
        @NoArgsConstructor
        public static class PaymentMethod {
            private String id;
            private String paymentTypeId;
        }
    }
}
