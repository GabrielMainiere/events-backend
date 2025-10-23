package br.com.mspayments.services;

import br.com.mspayments.models.Payment;
import br.com.mspayments.models.PaymentStatus;
import br.com.mspayments.repositories.PaymentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    @Override
    public Payment create(Payment input) {
        input.setCreatedAt(Instant.now());
        input.setStatus(PaymentStatus.PENDING);
        return paymentRepository.save(input);
    }

    @Override
    public List<Payment> findAll() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment findById(UUID id) {
        return paymentRepository.findById(id).orElse(null);
    }

    @Override
    public List<Payment> findAllByEventId(String eventId) {
        return paymentRepository.findByEventId(eventId);
    }
}
