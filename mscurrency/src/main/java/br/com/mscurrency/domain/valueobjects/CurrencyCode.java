package br.com.mscurrency.domain.valueobjects;

import br.com.mscurrency.domain.exceptions.InvalidCurrencyCodeException;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.regex.Pattern;

/**
 * Value Object que representa o código de uma moeda (ISO 4217)
 * Exemplo: USD, EUR, BRL
 */
@Getter
@EqualsAndHashCode
public class CurrencyCode {
    private static final Pattern CURRENCY_CODE_PATTERN = Pattern.compile("^[A-Z]{3}$");

    private final String value;

    private CurrencyCode(String value) {
        this.value = value;
    }

    public static CurrencyCode of(String code) {
        validate(code);
        return new CurrencyCode(code.toUpperCase());
    }

    private static void validate(String code) {
        if (code == null || code.isBlank()) {
            throw new InvalidCurrencyCodeException("Currency code cannot be null or empty");
        }

        String upperCode = code.toUpperCase();
        if (!CURRENCY_CODE_PATTERN.matcher(upperCode).matches()) {
            throw new InvalidCurrencyCodeException(
                    "Currency code must be 3 uppercase letters (ISO 4217). Received: " + code
            );
        }
    }

    @Override
    public String toString() {
        return value;
    }
}