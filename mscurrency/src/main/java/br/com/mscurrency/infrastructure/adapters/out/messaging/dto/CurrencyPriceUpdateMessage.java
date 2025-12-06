package br.com.mscurrency.infrastructure.adapters.out.messaging.dto;

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

