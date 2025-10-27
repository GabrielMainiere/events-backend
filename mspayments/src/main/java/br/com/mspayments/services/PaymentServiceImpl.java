package br.com.mspayments.services;

import br.com.mspayments.controllers.PaymentResponse;
import br.com.mspayments.controllers.dtos.CreatePaymentInput;
import br.com.mspayments.models.Payment;
import br.com.mspayments.models.PaymentStatus;
import br.com.mspayments.repositories.PaymentRepository;
import br.com.mspayments.strategies.paymentGateway.PaymentGatewayFactory;
import br.com.mspayments.strategies.paymentMethod.PaymentMethodFactory;
import br.com.mspayments.strategies.paymentMethod.dtos.PaymentMethodData;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;

    @Override
    public PaymentResponse create(CreatePaymentInput input) {
        try {
            PaymentMethodData paymentData = PaymentMethodData.fromCreatePaymentInput(input);

            paymentData.getPayment().setCreatedAt(Instant.now());
            paymentData.getPayment().setStatus(PaymentStatus.PENDING);

            var gatewayStrategy = PaymentGatewayFactory.getPaymentGateway(paymentData.getPayment().getGateway());
            var methodStrategy = PaymentMethodFactory.getPaymentMethod(paymentData.getPayment().getMethod());

            PaymentResponse response = methodStrategy.pay(gatewayStrategy, paymentData);

            updatePaymentStatusFromResponse(response);

            if (response.getPixData() != null) {
                response.getPayment().setGatewayTransactionId(response.getPixData().getId());
            } else if (response.getCreditCardData() != null) {
                response.getPayment().setGatewayTransactionId(response.getCreditCardData().getId());
            }

            paymentRepository.save(response.getPayment());
            return response;

        } catch (Exception e) {
            log.error("Erro ao processar pagamento: {}", e.getMessage(), e);

            Payment rejectedPayment = input.toPayment();
            rejectedPayment.setCreatedAt(Instant.now());
            rejectedPayment.setStatus(PaymentStatus.REJECTED);

            paymentRepository.save(rejectedPayment);

            return new PaymentResponse(rejectedPayment);
        }
    }

    private void updatePaymentStatusFromResponse(PaymentResponse response) {
        if (response.getCreditCardData() != null) {
            String status = response.getCreditCardData().getStatus();
            if ("approved".equalsIgnoreCase(status)) {
                response.getPayment().setStatus(PaymentStatus.APPROVED);
            } else {
                response.getPayment().setStatus(PaymentStatus.REJECTED);
            }
        } else if (response.getPixData() != null) {
            response.getPayment().setStatus(PaymentStatus.PENDING);
        }
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
    public void updatePaymentStatus(String gatewayTransactionId, PaymentStatus paymentStatus) {
        var paymentOpt = paymentRepository.findByGatewayTransactionId(gatewayTransactionId);
        if (paymentOpt.isEmpty()) {
            throw new RuntimeException("Payment not found for gatewayTransactionId: " + gatewayTransactionId);
        }

        var payment = paymentOpt.get();
        payment.setStatus(paymentStatus);
        paymentRepository.save(payment);
    }

    @Override
    public List<Payment> findAllByEventId(String eventId) {
        return paymentRepository.findByEventId(eventId);
    }
}
