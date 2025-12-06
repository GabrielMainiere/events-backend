package br.com.mscurrency.application.usecase;

import br.com.mscurrency.domain.entity.CurrencyPrice;
import br.com.mscurrency.domain.ports.in.ListAllCurrencyPricesPort;
import br.com.mscurrency.domain.ports.out.CurrencyPriceRepositoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Use Case para listar todos os preços de moeda
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ListAllCurrencyPricesUseCase implements ListAllCurrencyPricesPort {

    private final CurrencyPriceRepositoryPort repositoryPort;

    @Override
    @Transactional(readOnly = true)
    public List<CurrencyPrice> listAll() {
        log.debug("Listing all currency prices");
        List<CurrencyPrice> currencyPrices = repositoryPort.findAll();
        log.debug("Found {} currency prices", currencyPrices.size());
        return currencyPrices;
    }
}

