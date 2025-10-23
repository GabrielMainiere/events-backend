package br.com.mspayments.model;

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
    private String eventId;
    private String userDocument;
    private Integer amount; // cents
    @Enumerated(EnumType.STRING)
    private PaymentMethod method;
    @Enumerated(EnumType.STRING)
    private PaymentGateway gateway;
    private String gatewayTransactionId;
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
    private Instant createdAt;
}
