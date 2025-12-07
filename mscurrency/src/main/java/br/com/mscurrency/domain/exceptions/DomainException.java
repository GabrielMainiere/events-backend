package br.com.mscurrency.domain.exceptions;

/**
 * Exceção base para exceções do domínio
 */
public abstract class DomainException extends RuntimeException {
    public DomainException(String message) {
        super(message);
    }

    public DomainException(String message, Throwable cause) {
        super(message, cause);
    }
}

