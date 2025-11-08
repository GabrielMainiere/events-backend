package br.com.mspayments.services;

import br.com.mspayments.models.CurrencyPrice;
import br.com.mspayments.repositories.CurrencyPriceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CurrencyPriceServiceImpl implements CurrencyPriceService {

    private final CurrencyPriceRepository currencyPriceRepository;

    public void updateCurrencyPrice(String currencyCode, Float priceBRL) {
        log.info("Updating currency price for {} to {}", currencyCode, priceBRL);

        CurrencyPrice currencyPrice = currencyPriceRepository.findById(currencyCode)
                .orElse(new CurrencyPrice());

        currencyPrice.setCurrencyCode(currencyCode);
        currencyPrice.setPriceBRL(priceBRL);

        CurrencyPrice saved = currencyPriceRepository.save(currencyPrice);
        log.info("Currency price updated successfully for {}", currencyCode);
    }
}
