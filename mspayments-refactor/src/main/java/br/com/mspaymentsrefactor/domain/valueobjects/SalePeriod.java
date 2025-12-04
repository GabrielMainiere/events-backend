package br.com.mspaymentsrefactor.domain.valueobjects;

import java.time.Instant;
import java.util.Objects;

/**
 * Value Object que representa o período de venda de ingressos
 */
public class SalePeriod {
    private final Instant saleStartAt;
    private final Instant saleEndAt;

    public SalePeriod(Instant saleStartAt, Instant saleEndAt) {
        if (saleStartAt == null || saleEndAt == null) {
            throw new IllegalArgumentException("Sale start and end dates cannot be null");
        }
        if (saleStartAt.isAfter(saleEndAt)) {
            throw new IllegalArgumentException("Sale start date must be before end date");
        }
        this.saleStartAt = saleStartAt;
        this.saleEndAt = saleEndAt;
    }

    public Instant getSaleStartAt() {
        return saleStartAt;
    }

    public Instant getSaleEndAt() {
        return saleEndAt;
    }

    public boolean isOpen() {
        Instant now = Instant.now();
        return !now.isBefore(saleStartAt) && !now.isAfter(saleEndAt);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SalePeriod that = (SalePeriod) o;
        return Objects.equals(saleStartAt, that.saleStartAt) &&
               Objects.equals(saleEndAt, that.saleEndAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(saleStartAt, saleEndAt);
    }

    @Override
    public String toString() {
        return String.format("SalePeriod[%s - %s]", saleStartAt, saleEndAt);
    }
}

