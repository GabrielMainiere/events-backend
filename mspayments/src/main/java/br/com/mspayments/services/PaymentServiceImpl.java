package br.com.mspayments.services;

import br.com.mspayments.controllers.PaymentResponse;
import br.com.mspayments.models.Payment;
import br.com.mspayments.models.PaymentStatus;
import br.com.mspayments.repositories.PaymentRepository;
import br.com.mspayments.strategies.paymentGateway.PaymentGatewayFactory;
import br.com.mspayments.strategies.paymentMethod.PaymentMethodFactory;
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
    public PaymentResponse create(Payment input) {
        input.setCreatedAt(Instant.now());
        input.setStatus(PaymentStatus.PENDING);
        var gatewayStrategy = PaymentGatewayFactory.getPaymentGateway(input.getGateway());
        var methodStrategy = PaymentMethodFactory.getPaymentMethod(input.getMethod());
        var response = methodStrategy.pay(gatewayStrategy, input);
        response.getPayment().setGatewayTransactionId(response.getPixData().getId());
        paymentRepository.save(response.getPayment());
        return response;
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
