package br.com.mscurrency.domain.ports.in;

import br.com.mscurrency.domain.entity.CurrencyPrice;

/**
 * Port de entrada para atualizar um preço de moeda existente
 */
public interface UpdateCurrencyPricePort {
    CurrencyPrice update(String currencyCode, Float priceBRL);
}

