package br.com.mscurrency.domain.valueobjects;

import br.com.mscurrency.domain.exceptions.InvalidPriceException;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Value Object que representa um preço em BRL
 */
@Getter
@EqualsAndHashCode
public class Price {
    private final Float value;

    private Price(Float value) {
        this.value = value;
    }

    public static Price of(Float value) {
        validate(value);
        return new Price(round(value));
    }

    private static void validate(Float value) {
        if (value == null) {
            throw new InvalidPriceException("Price cannot be null");
        }

        if (value < 0) {
            throw new InvalidPriceException("Price cannot be negative. Received: " + value);
        }

        if (value.isNaN() || value.isInfinite()) {
            throw new InvalidPriceException("Price must be a valid number. Received: " + value);
        }
    }

    private static Float round(Float value) {
        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(4, RoundingMode.HALF_UP);
        return bd.floatValue();
    }

    public Price multiply(Float multiplier) {
        return Price.of(this.value * multiplier);
    }

    public Price add(Price other) {
        return Price.of(this.value + other.value);
    }

    @Override
    public String toString() {
        return String.format("%.4f", value);
    }
}

