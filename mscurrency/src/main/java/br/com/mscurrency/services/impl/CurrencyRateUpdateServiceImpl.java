package br.com.mscurrency.services.impl;

import br.com.mscurrency.models.CurrencyPrice;
import br.com.mscurrency.repositories.CurrencyPriceRepository;
import br.com.mscurrency.services.CurrencyRateUpdateService;
import br.com.mscurrency.services.ExchangeRateApiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CurrencyRateUpdateServiceImpl implements CurrencyRateUpdateService {

    private final ExchangeRateApiService exchangeRateApiService;
    private final CurrencyPriceRepository currencyPriceRepository;

    @Override
    @Transactional
    public void updateCurrencyRatesFromApi() {
        log.info("Starting currency rate update from API");

        try {
            List<CurrencyPrice> existingCurrencies = currencyPriceRepository.findAll();

            if (existingCurrencies.isEmpty()) {
                log.info("No currencies found in database to update");
                return;
            }

            Map<String, Float> exchangeRates = exchangeRateApiService.getExchangeRates();

            if (exchangeRates.isEmpty()) {
                log.warn("No exchange rates received from API");
                return;
            }

            int updatedCount = 0;

            for (CurrencyPrice currency : existingCurrencies) {
                String currencyCode = currency.getCurrencyCode();

                if (exchangeRates.containsKey(currencyCode)) {
                    Float newRate = exchangeRates.get(currencyCode);
                    Float currentRate = currency.getPriceBRL();

                    if (newRate != null && !newRate.equals(currentRate)) {
                        currency.setPriceBRL(newRate);
                        currency.setLastUpdated(LocalDateTime.now());
                        currencyPriceRepository.save(currency);
                        updatedCount++;

                        log.info("Updated {} from {} to {}", currencyCode, currentRate, newRate);
                    } else {
                        log.debug("No change needed for {} (current: {}, new: {})", currencyCode, currentRate, newRate);
                    }
                } else {
                    log.warn("Currency {} not found in exchange rates API", currencyCode);
                }
            }

            log.info("Currency rate update completed. Updated {} currencies out of {}", updatedCount, existingCurrencies.size());

        } catch (Exception e) {
            log.error("Error during currency rate update", e);
            throw new RuntimeException("Failed to update currency rates", e);
        }
    }
}
