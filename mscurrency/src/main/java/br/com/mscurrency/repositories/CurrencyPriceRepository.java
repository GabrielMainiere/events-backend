package br.com.mscurrency.repositories;

import br.com.mscurrency.models.CurrencyPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CurrencyPriceRepository extends JpaRepository<CurrencyPrice, String> {
    Optional<CurrencyPrice> findByCurrencyCode(String currencyCode);
    boolean existsByCurrencyCode(String currencyCode);
}
