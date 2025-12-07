package br.com.mscurrency.infrastructure.adapters.in.graphql.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO de resposta GraphQL para CurrencyPrice
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CurrencyPriceResponse {
    private String currencyCode;
    private Float priceBRL;
    private LocalDateTime lastUpdated;
}
