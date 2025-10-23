package br.com.mspayments.services;

import br.com.mspayments.models.Payment;

import java.util.List;
import java.util.UUID;

public interface PaymentService {
    Payment create(Payment input);
    List<Payment> findAll();
    List<Payment> findAllByEventId(String eventId);
    Payment findById(UUID id);
}
