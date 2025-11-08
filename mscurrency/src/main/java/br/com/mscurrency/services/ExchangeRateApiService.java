package br.com.mscurrency.services;

import java.util.Map;

public interface ExchangeRateApiService {
    Map<String, Float> getExchangeRates();
}
