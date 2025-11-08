package br.com.mscurrency.services.impl;

import br.com.mscurrency.models.CurrencyPrice;
import br.com.mscurrency.repositories.CurrencyPriceRepository;
import br.com.mscurrency.services.CurrencyPriceService;
import br.com.mscurrency.services.PaymentGrpcService;
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
    private final PaymentGrpcService paymentGrpcService;

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
    public CurrencyPrice createCurrencyPrice(String currencyCode, Float priceBRL) {
        if (currencyPriceRepository.existsByCurrencyCode(currencyCode)) {
            throw new IllegalArgumentException("Currency with code " + currencyCode + " already exists");
        }

        CurrencyPrice currencyPrice = new CurrencyPrice();
        currencyPrice.setCurrencyCode(currencyCode.toUpperCase());
        currencyPrice.setPriceBRL(priceBRL);
        currencyPrice.setLastUpdated(LocalDateTime.now());

        CurrencyPrice savedCurrency = currencyPriceRepository.save(currencyPrice);

        // Enviar para o microsserviço de pagamentos via gRPC
        paymentGrpcService.sendCurrencyPriceUpdate(savedCurrency.getCurrencyCode(), savedCurrency.getPriceBRL());

        return savedCurrency;
    }

    @Override
    public CurrencyPrice updateCurrencyPrice(String currencyCode, Float priceBRL) {
        CurrencyPrice currencyPrice = currencyPriceRepository.findByCurrencyCode(currencyCode)
                .orElseThrow(() -> new IllegalArgumentException("Currency with code " + currencyCode + " not found"));

        currencyPrice.setPriceBRL(priceBRL);
        currencyPrice.setLastUpdated(LocalDateTime.now());

        CurrencyPrice updatedCurrency = currencyPriceRepository.save(currencyPrice);

        // Enviar para o microsserviço de pagamentos via gRPC
        paymentGrpcService.sendCurrencyPriceUpdate(updatedCurrency.getCurrencyCode(), updatedCurrency.getPriceBRL());

        return updatedCurrency;
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
