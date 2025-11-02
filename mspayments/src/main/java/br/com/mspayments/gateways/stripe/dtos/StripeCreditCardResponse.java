package br.com.mspayments.gateways.stripe.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StripeCreditCardResponse {
    private String id;
    private String status;
    private Boolean paid;
    private String failureCode;
    private String failureMessage;
    private Source source;

    @Data
    @NoArgsConstructor
    public static class Source {
        private String id;
        private String brand;
        private String last4;
        private String expMonth;
        private String expYear;
    }
}
