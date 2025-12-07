package br.com.mscurrency.application.usecase;

import br.com.mscurrency.domain.entity.CurrencyPrice;
import br.com.mscurrency.domain.ports.in.SyncCurrencyRatesPort;
import br.com.mscurrency.domain.ports.out.CurrencyPriceNotificationPort;
import br.com.mscurrency.domain.ports.out.CurrencyPriceRepositoryPort;
import br.com.mscurrency.domain.ports.out.ExchangeRateProviderPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Use Case para sincronizar taxas de câmbio da API externa
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class SyncCurrencyRatesUseCase implements SyncCurrencyRatesPort {

    private final CurrencyPriceRepositoryPort repositoryPort;
    private final ExchangeRateProviderPort exchangeRateProviderPort;
    private final CurrencyPriceNotificationPort notificationPort;

    @Override
    @Transactional
    public void syncRates() {
        log.info("Starting currency rates synchronization from external API");

        try {
            // Obtém as taxas da API externa
            Map<String, Float> exchangeRates = exchangeRateProviderPort.getExchangeRates();
            log.info("Received {} exchange rates from external API", exchangeRates.size());

            // Busca todas as moedas cadastradas no banco
            List<CurrencyPrice> existingCurrencies = repositoryPort.findAll();
            log.info("Found {} currencies in database", existingCurrencies.size());

            // Lista para armazenar moedas atualizadas

            // Atualiza apenas as moedas que existem no banco e na API
            for (CurrencyPrice existingCurrency : existingCurrencies) {
                String currencyCode = existingCurrency.getCurrencyCodeValue();

                if (exchangeRates.containsKey(currencyCode)) {
                    Float newRate = exchangeRates.get(currencyCode);

                    // Atualiza o preço
                    existingCurrency.updatePrice(newRate);
                    repositoryPort.save(existingCurrency);
                    notificationPort.notifyPriceUpdate(existingCurrency);
                    log.debug("Updated {} with new rate: {}", currencyCode, newRate);
                } else {
                    log.debug("Currency {} not found in API response, skipping", currencyCode);
                }
            }

        } catch (Exception e) {
            log.error("Error during currency rates synchronization", e);
            throw new RuntimeException("Failed to sync currency rates", e);
        }
    }

    @Override
    @Transactional
    public void syncOnStartup() {
        log.info("Starting currency rates synchronization on application startup");
        try {
            // Executa a sincronização
            syncRates();
        } catch (Exception e) {
            log.error("Error during startup currency rates synchronization", e);
        }
    }
}


