package br.com.mscurrency.infrastructure.adapters.out.persistence.repository;

import br.com.mscurrency.infrastructure.adapters.out.persistence.entity.CurrencyPriceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository JPA para CurrencyPriceEntity
 */
@Repository
public interface CurrencyPriceJpaRepository extends JpaRepository<CurrencyPriceEntity, String> {

    Optional<CurrencyPriceEntity> findByCurrencyCode(String currencyCode);

    boolean existsByCurrencyCode(String currencyCode);

    void deleteByCurrencyCode(String currencyCode);
}

