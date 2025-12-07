package br.com.mscurrency.domain.exceptions;

/**
 * Exceção lançada quando um preço de moeda não é encontrado
 */
public class CurrencyPriceNotFoundException extends DomainException {
    public CurrencyPriceNotFoundException(String currencyCode) {
        super("Currency price not found for code: " + currencyCode);
    }

    public CurrencyPriceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}

