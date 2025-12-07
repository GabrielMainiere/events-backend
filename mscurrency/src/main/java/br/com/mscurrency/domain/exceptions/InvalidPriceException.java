package br.com.mscurrency.domain.exceptions;

/**
 * Exceção lançada quando um preço inválido é fornecido
 */
public class InvalidPriceException extends DomainException {
    public InvalidPriceException(String message) {
        super(message);
    }

    public InvalidPriceException(String message, Throwable cause) {
        super(message, cause);
    }
}

