package br.com.mspayments.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "tb_payments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // Referências para as entidades Event e User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Integer amount; // cents - valor original do evento

    // Novos campos para conversão de moeda
    @Column(name = "base_price", nullable = false)
    private Integer basePrice; // preço base em centavos BRL (do evento)

    @Column(name = "final_price", nullable = false)
    private Integer finalPrice; // preço final em centavos na moeda especificada

    @Column(name = "currency_code", length = 3, nullable = false)
    private String currencyCode; // código da moeda utilizada (USD, EUR, BRL)

    @Enumerated(EnumType.STRING)
    private PaymentMethod method;
    @Enumerated(EnumType.STRING)
    private PaymentGateway gateway;
    private String gatewayTransactionId;
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
    private Instant createdAt;
}
