package br.com.mscurrency.infrastructure.adapters.out.persistence;

import br.com.mscurrency.domain.entity.CurrencyPrice;
import br.com.mscurrency.domain.ports.out.CurrencyPriceRepositoryPort;
import br.com.mscurrency.infrastructure.adapters.out.persistence.entity.CurrencyPriceEntity;
import br.com.mscurrency.infrastructure.adapters.out.persistence.mapper.CurrencyPriceMapper;
import br.com.mscurrency.infrastructure.adapters.out.persistence.repository.CurrencyPriceJpaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

/**
 * Adaptador JPA que implementa a porta de saída de persistência
 * Responsável por traduzir operações do domínio para operações JPA
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class CurrencyPriceJpaAdapter implements CurrencyPriceRepositoryPort {

    private final CurrencyPriceJpaRepository jpaRepository;
    private final CurrencyPriceMapper mapper;

    @Override
    public CurrencyPrice save(CurrencyPrice currencyPrice) {
        log.debug("Saving currency price: {}", currencyPrice.getCurrencyCodeValue());

        CurrencyPriceEntity entity = mapper.toEntity(currencyPrice);
        CurrencyPriceEntity savedEntity = jpaRepository.save(entity);

        log.debug("Currency price saved successfully: {}", savedEntity.getCurrencyCode());
        return mapper.toDomain(savedEntity);
    }

    @Override
    public Optional<CurrencyPrice> findByCode(String currencyCode) {
        log.debug("Finding currency price by code: {}", currencyCode);

        return jpaRepository.findByCurrencyCode(currencyCode)
                .map(mapper::toDomain);
    }

    @Override
    public List<CurrencyPrice> findAll() {
        log.debug("Finding all currency prices");

        List<CurrencyPriceEntity> entities = jpaRepository.findAll();
        return mapper.toDomainList(entities);
    }

    @Override
    public void deleteByCode(String currencyCode) {
        log.debug("Deleting currency price by code: {}", currencyCode);

        jpaRepository.deleteByCurrencyCode(currencyCode);

        log.debug("Currency price deleted successfully: {}", currencyCode);
    }

    @Override
    public boolean existsByCode(String currencyCode) {
        log.debug("Checking if currency price exists by code: {}", currencyCode);

        return jpaRepository.existsByCurrencyCode(currencyCode);
    }

    @Override
    public List<CurrencyPrice> saveAll(List<CurrencyPrice> currencyPrices) {
        log.debug("Saving {} currency prices", currencyPrices.size());

        List<CurrencyPriceEntity> entities = mapper.toEntityList(currencyPrices);
        List<CurrencyPriceEntity> savedEntities = jpaRepository.saveAll(entities);

        log.debug("Successfully saved {} currency prices", savedEntities.size());
        return mapper.toDomainList(savedEntities);
    }
}
