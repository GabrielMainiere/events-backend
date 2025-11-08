package br.com.mscurrency.services.impl;

import br.com.mscurrency.models.CurrencyPrice;
import br.com.mscurrency.repositories.CurrencyPriceRepository;
import br.com.mscurrency.services.CurrencyPriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CurrencyPriceServiceImpl implements CurrencyPriceService {

    private final CurrencyPriceRepository currencyPriceRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CurrencyPrice> findAll() {
        return currencyPriceRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CurrencyPrice> findByCurrencyCode(String currencyCode) {
        return currencyPriceRepository.findByCurrencyCode(currencyCode);
    }

    @Override
    public CurrencyPrice createCurrencyPrice(String currencyCode, Long priceInCentsBRL) {
        if (currencyPriceRepository.existsByCurrencyCode(currencyCode)) {
            throw new IllegalArgumentException("Currency with code " + currencyCode + " already exists");
        }

        CurrencyPrice currencyPrice = new CurrencyPrice();
        currencyPrice.setCurrencyCode(currencyCode.toUpperCase());
        currencyPrice.setPriceInCentsBRL(priceInCentsBRL);
        currencyPrice.setLastUpdated(LocalDateTime.now());

        return currencyPriceRepository.save(currencyPrice);
    }

    @Override
    public CurrencyPrice updateCurrencyPrice(String currencyCode, Long priceInCentsBRL) {
        CurrencyPrice currencyPrice = currencyPriceRepository.findByCurrencyCode(currencyCode)
                .orElseThrow(() -> new IllegalArgumentException("Currency with code " + currencyCode + " not found"));

        currencyPrice.setPriceInCentsBRL(priceInCentsBRL);
        currencyPrice.setLastUpdated(LocalDateTime.now());

        return currencyPriceRepository.save(currencyPrice);
    }

    @Override
    public boolean deleteCurrencyPrice(String currencyCode) {
        if (!currencyPriceRepository.existsByCurrencyCode(currencyCode)) {
            return false;
        }

        currencyPriceRepository.deleteById(currencyCode);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByCurrencyCode(String currencyCode) {
        return currencyPriceRepository.existsByCurrencyCode(currencyCode);
    }
}
