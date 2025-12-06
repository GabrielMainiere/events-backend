package br.com.mscurrency.domain.ports.in;

/**
 * Port de entrada para sincronizar taxas de câmbio da API externa
 */
public interface SyncCurrencyRatesPort {
    void syncRates();
    void syncOnStartup();
}

