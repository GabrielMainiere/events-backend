package br.com.mscurrency.dto;

import lombok.Data;

@Data
public class CreateCurrencyPriceInput {
    private String currencyCode;
    private Long priceInCentsBRL;
}
