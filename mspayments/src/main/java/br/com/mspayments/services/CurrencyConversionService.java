package br.com.mspayments.services;

import br.com.mspayments.models.CurrencyPrice;

public interface CurrencyConversionService {
    Integer convertFromBRL(Integer amountInBRL, String currencyCode);

    CurrencyPrice getCurrencyRate(String currencyCode);

    boolean isCurrencySupported(String currencyCode);
}
