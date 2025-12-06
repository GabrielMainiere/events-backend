package br.com.mscurrency.domain.ports.in;

import br.com.mscurrency.domain.entity.CurrencyPrice;

import java.util.Optional;

/**
 * Port de entrada para buscar um preço de moeda por código
 */
public interface GetCurrencyPricePort {
    Optional<CurrencyPrice> getByCode(String currencyCode);
    boolean exists(String currencyCode);
}

