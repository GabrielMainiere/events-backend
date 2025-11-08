package br.com.mspayments.repositories;

import br.com.mspayments.models.CurrencyPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrencyPriceRepository extends JpaRepository<CurrencyPrice, String> {
}
