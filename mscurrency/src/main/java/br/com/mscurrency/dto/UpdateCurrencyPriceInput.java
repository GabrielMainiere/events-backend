package br.com.mscurrency.dto;
import lombok.Data;

@Data
public class UpdateCurrencyPriceInput {
    private String currencyCode;
    private Long priceInCentsBRL;
}