package br.com.mscurrency.infrastructure.adapters.in.graphql.dto;

import lombok.Data;

@Data
public class UpdateCurrencyPriceInput {
    private String currencyCode;
    private Float priceBRL;
}