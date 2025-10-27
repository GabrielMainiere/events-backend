package br.com.mspayments.strategies.paymentGateway.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreditCardResponse {
    private String id;
    private String status;
}
