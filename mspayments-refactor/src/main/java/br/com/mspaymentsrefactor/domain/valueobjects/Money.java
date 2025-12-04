package br.com.mspaymentsrefactor.domain.valueobjects;

import java.util.Objects;

/**
 * Value Object que representa um valor monetário
 */
public class Money {
    private final Integer amountInCents;
    private final String currencyCode;

    public Money(Integer amountInCents, String currencyCode) {
        if (amountInCents == null || amountInCents < 0) {
            throw new IllegalArgumentException("Amount cannot be null or negative");
        }
        if (currencyCode == null || currencyCode.length() != 3) {
            throw new IllegalArgumentException("Currency code must be 3 characters");
        }
        this.amountInCents = amountInCents;
        this.currencyCode = currencyCode.toUpperCase();
    }

    public Integer getAmountInCents() {
        return amountInCents;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public Money convertTo(String targetCurrency, Float conversionRate) {
        if (this.currencyCode.equals(targetCurrency)) {
            return this;
        }
        Integer convertedAmount = (int) (this.amountInCents * conversionRate);
        return new Money(convertedAmount, targetCurrency);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Money money = (Money) o;
        return Objects.equals(amountInCents, money.amountInCents) &&
                Objects.equals(currencyCode, money.currencyCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(amountInCents, currencyCode);
    }

    @Override
    public String toString() {
        return String.format("%d cents %s", amountInCents, currencyCode);
    }
}