package br.com.mscurrency.domain.exceptions;

/**
 * Exceção lançada quando um código de moeda inválido é fornecido
 */
public class InvalidCurrencyCodeException extends DomainException {
    public InvalidCurrencyCodeException(String message) {
        super(message);
    }

    public InvalidCurrencyCodeException(String message, Throwable cause) {
        super(message, cause);
    }
}

