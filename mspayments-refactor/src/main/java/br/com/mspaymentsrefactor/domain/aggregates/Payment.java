package br.com.mspaymentsrefactor.domain.aggregates;

import br.com.mspaymentsrefactor.domain.valueobjects.Money;
import br.com.mspaymentsrefactor.domain.valueobjects.PaymentGateway;
import br.com.mspaymentsrefactor.domain.valueobjects.PaymentMethod;
import br.com.mspaymentsrefactor.domain.valueobjects.PaymentStatus;

import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

/**
 * Agregado raiz Payment - representa um pagamento completo
 */
public class Payment {
    private UUID id;
    private UUID eventId;
    private UUID userId;

    // Informações de preço
    private Money basePrice;       // preço base em BRL
    private Money finalPrice;      // preço final na moeda escolhida

    // Informações de pagamento
    private PaymentMethod method;
    private PaymentGateway gateway;
    private String gatewayTransactionId;
    private PaymentStatus status;

    private Instant createdAt;

    // Construtor para criar novo pagamento
    public Payment(UUID eventId, UUID userId, Money basePrice, Money finalPrice,
                   PaymentMethod method, PaymentGateway gateway) {
        if (eventId == null) {
            throw new IllegalArgumentException("Event ID cannot be null");
        }
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        if (basePrice == null) {
            throw new IllegalArgumentException("Base price cannot be null");
        }
        if (finalPrice == null) {
            throw new IllegalArgumentException("Final price cannot be null");
        }
        if (method == null) {
            throw new IllegalArgumentException("Payment method cannot be null");
        }
        if (gateway == null) {
            throw new IllegalArgumentException("Payment gateway cannot be null");
        }

        this.id = UUID.randomUUID();
        this.eventId = eventId;
        this.userId = userId;
        this.basePrice = basePrice;
        this.finalPrice = finalPrice;
        this.method = method;
        this.gateway = gateway;
        this.status = PaymentStatus.PENDING;
        this.createdAt = Instant.now();
    }

    // Construtor para reconstruir do banco
    public Payment(UUID id, UUID eventId, UUID userId, Money basePrice, Money finalPrice,
                   PaymentMethod method, PaymentGateway gateway, String gatewayTransactionId,
                   PaymentStatus status, Instant createdAt) {
        this.id = id;
        this.eventId = eventId;
        this.userId = userId;
        this.basePrice = basePrice;
        this.finalPrice = finalPrice;
        this.method = method;
        this.gateway = gateway;
        this.gatewayTransactionId = gatewayTransactionId;
        this.status = status;
        this.createdAt = createdAt;
    }

    public boolean isPending() {
        return status == PaymentStatus.PENDING;
    }

    public boolean isApproved() {
        return status == PaymentStatus.APPROVED;
    }

    public boolean isFinal() {
        return status.isFinal();
    }

    // Getters
    public UUID getId() {
        return id;
    }

    public UUID getEventId() {
        return eventId;
    }

    public UUID getUserId() {
        return userId;
    }

    public Money getBasePrice() {
        return basePrice;
    }

    public Money getFinalPrice() {
        return finalPrice;
    }

    public PaymentMethod getMethod() {
        return method;
    }

    public PaymentGateway getGateway() {
        return gateway;
    }

    public String getGatewayTransactionId() {
        return gatewayTransactionId;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Payment payment = (Payment) o;
        return Objects.equals(id, payment.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return String.format("Payment[id=%s, status=%s, finalPrice=%s]", id, status, finalPrice);
    }
}


