package br.com.mspayments.services;

import br.com.mspayments.models.CurrencyPrice;
import br.com.mspayments.repositories.CurrencyPriceRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CurrencyConversionServiceImpl implements CurrencyConversionService {

    private final CurrencyPriceRepository currencyPriceRepository;

    public CurrencyConversionServiceImpl(CurrencyPriceRepository currencyPriceRepository) {
        this.currencyPriceRepository = currencyPriceRepository;
    }

    @Override
    public Integer convertFromBRL(Integer amountInBRL, String currencyCode) {
        // Se a moeda é BRL, retorna o valor original
        if ("BRL".equalsIgnoreCase(currencyCode)) {
            return amountInBRL;
        }

        CurrencyPrice currencyRate = getCurrencyRate(currencyCode);
        if (currencyRate == null) {
            log.warn("Currency rate not found for: {}. Using BRL value", currencyCode);
            return amountInBRL;
        }

        double conversionRate = currencyRate.getPriceBRL();
        double convertedAmount = amountInBRL * conversionRate;

        log.info("Converting {} centavos BRL to {} using rate {} = {} centavos {}",
                amountInBRL, currencyCode, conversionRate, Math.round(convertedAmount), currencyCode);

        return Math.round((float) convertedAmount);
    }

    @Override
    public CurrencyPrice getCurrencyRate(String currencyCode) {
        return currencyPriceRepository.findById(currencyCode.toUpperCase()).orElse(null);
    }

    @Override
    public boolean isCurrencySupported(String currencyCode) {
        if ("BRL".equalsIgnoreCase(currencyCode)) {
            return true; // BRL sempre suportado
        }
        return currencyPriceRepository.existsById(currencyCode.toUpperCase());
    }
}
