package br.com.mspayments.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CurrencyPriceUpdateMessage {
    private String currencyCode;
    private Float priceBRL;
}

