package br.com.mscurrency.domain.ports.in;

import br.com.mscurrency.domain.entity.CurrencyPrice;

/**
 * Port de entrada para criar um novo preço de moeda
 */
public interface CreateCurrencyPricePort {
    CurrencyPrice create(String currencyCode, Float priceBRL);
}
