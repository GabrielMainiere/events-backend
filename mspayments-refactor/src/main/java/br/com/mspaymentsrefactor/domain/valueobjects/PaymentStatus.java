package br.com.mspaymentsrefactor.domain.valueobjects;

/**
 * Value Object que representa o status de um pagamento
 */
public enum PaymentStatus {
    PENDING,
    APPROVED,
    REJECTED,
    CANCELLED,
    REFUNDED;

    public boolean canTransitionTo(PaymentStatus newStatus) {
        return switch (this) {
            case PENDING -> newStatus == APPROVED || newStatus == REJECTED || newStatus == CANCELLED;
            case APPROVED -> newStatus == REFUNDED || newStatus == CANCELLED;
            case REJECTED, CANCELLED, REFUNDED -> false;
        };
    }

    public boolean isFinal() {
        return this == APPROVED || this == REJECTED || this == CANCELLED || this == REFUNDED;
    }
}

