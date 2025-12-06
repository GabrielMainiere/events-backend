package br.com.mscurrency.application.usecase;

import br.com.mscurrency.domain.entity.CurrencyPrice;
import br.com.mscurrency.domain.exceptions.CurrencyPriceNotFoundException;
import br.com.mscurrency.domain.ports.in.UpdateCurrencyPricePort;
import br.com.mscurrency.domain.ports.out.CurrencyPriceNotificationPort;
import br.com.mscurrency.domain.ports.out.CurrencyPriceRepositoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Use Case para atualizar um preço de moeda existente
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UpdateCurrencyPriceUseCase implements UpdateCurrencyPricePort {

    private final CurrencyPriceRepositoryPort repositoryPort;
    private final CurrencyPriceNotificationPort notificationPort;

    @Override
    @Transactional
    public CurrencyPrice update(String currencyCode, Float priceBRL) {
        log.info("Updating currency price for code: {} with new price: {}", currencyCode, priceBRL);

        // Busca a entidade existente
        CurrencyPrice currencyPrice = repositoryPort.findByCode(currencyCode)
                .orElseThrow(() -> new CurrencyPriceNotFoundException(currencyCode));

        // Atualiza o preço (regras de negócio no domínio)
        currencyPrice.updatePrice(priceBRL);

        // Persiste a atualização
        CurrencyPrice updatedCurrencyPrice = repositoryPort.save(currencyPrice);

        // Notifica outros serviços
        notificationPort.notifyPriceUpdate(updatedCurrencyPrice);

        log.info("Currency price updated successfully for code: {}", currencyCode);
        return updatedCurrencyPrice;
    }
}

