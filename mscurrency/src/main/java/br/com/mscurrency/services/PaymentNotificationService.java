package br.com.mscurrency.services;

import br.com.mscurrency.models.CurrencyPrice;

import java.util.List;

public interface PaymentNotificationService {
    void sendCurrencyPriceUpdate(String currencyCode, Float priceBRL);
    void sendAllCurrencyPrices(List<CurrencyPrice> currencyPrices);
}
