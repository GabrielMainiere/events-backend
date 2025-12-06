package br.com.mscurrency.application.usecase;

import br.com.mscurrency.domain.exceptions.CurrencyPriceNotFoundException;
import br.com.mscurrency.domain.ports.in.DeleteCurrencyPricePort;
import br.com.mscurrency.domain.ports.out.CurrencyPriceNotificationPort;
import br.com.mscurrency.domain.ports.out.CurrencyPriceRepositoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Use Case para deletar um preço de moeda
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DeleteCurrencyPriceUseCase implements DeleteCurrencyPricePort {

    private final CurrencyPriceRepositoryPort repositoryPort;

    @Override
    @Transactional
    public boolean delete(String currencyCode) {
        log.info("Deleting currency price for code: {}", currencyCode);

        // Verifica se existe
        if (!repositoryPort.existsByCode(currencyCode)) {
            log.warn("Currency price not found for code: {}", currencyCode);
            throw new CurrencyPriceNotFoundException(currencyCode);
        }

        // Deleta do banco
        repositoryPort.deleteByCode(currencyCode);

        log.info("Currency price deleted successfully for code: {}", currencyCode);
        return true;
    }
}

