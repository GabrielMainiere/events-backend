package br.com.mscurrency.domain.entity;

import br.com.mscurrency.domain.valueobjects.CurrencyCode;
import br.com.mscurrency.domain.valueobjects.Price;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * Entidade de Domínio que representa o preço de uma moeda em relação ao BRL
 * Esta é uma entidade PURA de domínio - SEM anotações de infraestrutura (JPA, etc)
 */
@Getter
@AllArgsConstructor
public class CurrencyPrice {
    private final CurrencyCode currencyCode;
    private Price priceBRL;
    private LocalDateTime lastUpdated;

    /**
     * Construtor para criar uma nova CurrencyPrice
     */
    public static CurrencyPrice create(String currencyCode, Float priceBRL) {
        return new CurrencyPrice(
            CurrencyCode.of(currencyCode),
            Price.of(priceBRL),
            LocalDateTime.now()
        );
    }

    /**
     * Construtor para reconstruir uma CurrencyPrice existente (ex: do banco de dados)
     */
    public static CurrencyPrice reconstruct(String currencyCode, Float priceBRL, LocalDateTime lastUpdated) {
        return new CurrencyPrice(
            CurrencyCode.of(currencyCode),
            Price.of(priceBRL),
            lastUpdated
        );
    }

    /**
     * Atualiza o preço da moeda
     */
    public void updatePrice(Float newPrice) {
        this.priceBRL = Price.of(newPrice);
        this.lastUpdated = LocalDateTime.now();
    }

    /**
     * Verifica se o preço está desatualizado (mais de 3 horas)
     */
    public boolean isOutdated() {
        return LocalDateTime.now().minusHours(3).isAfter(lastUpdated);
    }

    /**
     * Verifica se o preço foi atualizado recentemente (menos de 1 minuto)
     */
    public boolean isRecentlyUpdated() {
        return LocalDateTime.now().minusMinutes(1).isBefore(lastUpdated);
    }

    /**
     * Retorna o código da moeda como String
     */
    public String getCurrencyCodeValue() {
        return currencyCode.getValue();
    }

    /**
     * Retorna o preço como Float
     */
    public Float getPriceValue() {
        return priceBRL.getValue();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CurrencyPrice that = (CurrencyPrice) o;
        return currencyCode.equals(that.currencyCode);
    }

    @Override
    public int hashCode() {
        return currencyCode.hashCode();
    }

    @Override
    public String toString() {
        return "CurrencyPrice{" +
                "currencyCode=" + currencyCode +
                ", priceBRL=" + priceBRL +
                ", lastUpdated=" + lastUpdated +
                '}';
    }
}


