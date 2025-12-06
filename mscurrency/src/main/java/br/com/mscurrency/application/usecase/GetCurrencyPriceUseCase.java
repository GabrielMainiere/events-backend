package br.com.mscurrency.application.usecase;

import br.com.mscurrency.domain.entity.CurrencyPrice;
import br.com.mscurrency.domain.ports.in.GetCurrencyPricePort;
import br.com.mscurrency.domain.ports.out.CurrencyPriceRepositoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Use Case para buscar um preço de moeda
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class GetCurrencyPriceUseCase implements GetCurrencyPricePort {

    private final CurrencyPriceRepositoryPort repositoryPort;

    @Override
    @Transactional(readOnly = true)
    public Optional<CurrencyPrice> getByCode(String currencyCode) {
        log.debug("Getting currency price for code: {}", currencyCode);
        return repositoryPort.findByCode(currencyCode);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean exists(String currencyCode) {
        log.debug("Checking if currency price exists for code: {}", currencyCode);
        return repositoryPort.existsByCode(currencyCode);
    }
}

