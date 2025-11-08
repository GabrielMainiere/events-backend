package br.com.mspayments.services;

public interface CurrencyPriceService {
    void updateCurrencyPrice(String currencyCode, Float priceBRL);
}
