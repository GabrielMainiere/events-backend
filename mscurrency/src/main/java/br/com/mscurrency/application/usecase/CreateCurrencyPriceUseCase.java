package br.com.mscurrency.application.usecase;

import br.com.mscurrency.domain.entity.CurrencyPrice;
import br.com.mscurrency.domain.ports.in.CreateCurrencyPricePort;
import br.com.mscurrency.domain.ports.out.CurrencyPriceNotificationPort;
import br.com.mscurrency.domain.ports.out.CurrencyPriceRepositoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Use Case para criar um novo preço de moeda
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CreateCurrencyPriceUseCase implements CreateCurrencyPricePort {

    private final CurrencyPriceRepositoryPort repositoryPort;
    private final CurrencyPriceNotificationPort notificationPort;

    @Override
    @Transactional
    public CurrencyPrice create(String currencyCode, Float priceBRL) {
        log.info("Creating currency price for code: {} with price: {}", currencyCode, priceBRL);

        // Cria a entidade de domínio (validações são feitas aqui)
        CurrencyPrice currencyPrice = CurrencyPrice.create(currencyCode, priceBRL);

        // Persiste no banco
        CurrencyPrice savedCurrencyPrice = repositoryPort.save(currencyPrice);

        // Notifica outros serviços
        notificationPort.notifyPriceUpdate(savedCurrencyPrice);

        log.info("Currency price created successfully for code: {}", currencyCode);
        return savedCurrencyPrice;
    }
}