package br.com.mscurrency.services;

import br.com.mscurrency.models.CurrencyPrice;

import java.util.List;
import java.util.Optional;

public interface CurrencyPriceService {
    List<CurrencyPrice> findAll();
    Optional<CurrencyPrice> findByCurrencyCode(String currencyCode);
    CurrencyPrice createCurrencyPrice(String currencyCode, Float priceBRL);
    CurrencyPrice updateCurrencyPrice(String currencyCode, Float priceBRL);
    boolean deleteCurrencyPrice(String currencyCode);
    boolean existsByCurrencyCode(String currencyCode);
}
