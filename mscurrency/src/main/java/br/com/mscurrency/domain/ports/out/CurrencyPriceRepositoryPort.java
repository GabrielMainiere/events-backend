package br.com.mscurrency.domain.ports.out;

import br.com.mscurrency.domain.entity.CurrencyPrice;

import java.util.List;
import java.util.Optional;

/**
 * Port de saída para persistência de CurrencyPrice
 * Esta interface será implementada pelo adaptador de persistência (JPA)
 */
public interface CurrencyPriceRepositoryPort {
    /**
     * Salva ou atualiza um preço de moeda
     */
    CurrencyPrice save(CurrencyPrice currencyPrice);

    /**
     * Busca um preço de moeda por código
     */
    Optional<CurrencyPrice> findByCode(String currencyCode);

    /**
     * Lista todos os preços de moeda
     */
    List<CurrencyPrice> findAll();

    /**
     * Deleta um preço de moeda por código
     */
    void deleteByCode(String currencyCode);

    /**
     * Verifica se existe um preço para o código informado
     */
    boolean existsByCode(String currencyCode);

    /**
     * Salva múltiplos preços de moeda de uma vez
     */
    List<CurrencyPrice> saveAll(List<CurrencyPrice> currencyPrices);
}

