package br.com.mscurrency.services;

import br.com.mscurrency.models.CurrencyPrice;

import java.util.List;
import java.util.Optional;

public interface CurrencyPriceService {
    List<CurrencyPrice> findAll();
    Optional<CurrencyPrice> findByCurrencyCode(String currencyCode);
    CurrencyPrice createCurrencyPrice(String currencyCode, Long priceInCentsBRL);
    CurrencyPrice updateCurrencyPrice(String currencyCode, Long priceInCentsBRL);
    boolean deleteCurrencyPrice(String currencyCode);
    boolean existsByCurrencyCode(String currencyCode);
}
