package br.com.mspayments.repositories;

import br.com.mspayments.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {
    List<Payment> findByEventId(UUID eventId);
    Optional<Payment> findByGatewayTransactionId(String gatewayTransactionId);
}
