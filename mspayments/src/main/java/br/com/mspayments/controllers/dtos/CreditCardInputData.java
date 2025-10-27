package br.com.mspayments.controllers.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreditCardInputData {
    private String cardToken;
    private Integer installments;
    private String paymentMethodId;
}
