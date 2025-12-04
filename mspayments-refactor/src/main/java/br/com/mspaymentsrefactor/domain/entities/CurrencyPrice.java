package br.com.mspaymentsrefactor.domain.entities;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Entidade que representa a cotação de uma moeda em relação ao BRL
 */
public class CurrencyPrice {
    private String currencyCode;
    private Float priceBRL;
    private LocalDateTime lastUpdated;

    public CurrencyPrice(String currencyCode, Float priceBRL, LocalDateTime lastUpdated) {
        if (currencyCode == null || currencyCode.length() != 3) {
            throw new IllegalArgumentException("Currency code must be 3 characters");
        }
        if (priceBRL == null || priceBRL <= 0) {
            throw new IllegalArgumentException("Price in BRL must be positive");
        }
        this.currencyCode = currencyCode.toUpperCase();
        this.priceBRL = priceBRL;
        this.lastUpdated = lastUpdated != null ? lastUpdated : LocalDateTime.now();
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public Float getPriceBRL() {
        return priceBRL;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public Float getConversionRate() {
        return priceBRL;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CurrencyPrice that = (CurrencyPrice) o;
        return Objects.equals(currencyCode, that.currencyCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(currencyCode);
    }

    @Override
    public String toString() {
        return String.format("CurrencyPrice[%s = %.2f BRL]", currencyCode, priceBRL);
    }
}

