package br.com.mspayments.services;

import br.com.mspayments.controllers.PaymentResponse;
import br.com.mspayments.controllers.dtos.CreatePaymentInput;
import br.com.mspayments.controllers.dtos.RegistrationData;
import br.com.mspayments.grpc.registration.GetRegistrationResponse;
import br.com.mspayments.integrations.grpc.registration.RegistrationGrpcClient;
import br.com.mspayments.models.Event;
import br.com.mspayments.models.Payment;
import br.com.mspayments.models.PaymentStatus;
import br.com.mspayments.models.User;
import br.com.mspayments.publishers.PaymentNotificationPublisher;
import br.com.mspayments.repositories.PaymentRepository;
import br.com.mspayments.strategies.paymentGateway.PaymentGatewayFactory;
import br.com.mspayments.strategies.paymentMethod.PaymentMethodFactory;
import br.com.mspayments.strategies.paymentMethod.dtos.PaymentMethodData;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final RegistrationGrpcClient registrationGrpcClient;
    private final PaymentNotificationPublisher paymentNotificationPublisher;
    private final UserService userService;
    private final EventService eventService;
    private final CurrencyConversionService currencyConversionService;

    @Override
    @Transactional
    public PaymentResponse create(CreatePaymentInput input) {
        try {
            // Validar se a moeda é suportada antes de processar
            String targetCurrency = input.getCurrencyCode() != null ? input.getCurrencyCode().toUpperCase() : "BRL";
            if (!currencyConversionService.isCurrencySupported(targetCurrency)) {
                throw new RuntimeException("Moeda não suportada: " + targetCurrency);
            }

            // Chamada gRPC para obter dados de registro
            GetRegistrationResponse registrationResponse = registrationGrpcClient.getRegistration(
                input.getUserId(),
                input.getEventId()
            );

            if (registrationResponse == null) {
                throw new RuntimeException("Não há pagamentos pendentes - registro não encontrado");
            }
            log.info("Registration data obtained for userId: {} and eventId: {}",
                input.getUserId(), input.getEventId());

            // Converter resposta gRPC para DTO interno
            RegistrationData registrationData = RegistrationData.fromGrpcResponse(registrationResponse);
            log.info("Event: {} - User: {}", registrationData.getEvent().getTitle(), registrationData.getUser().getName());

            Event event = eventService.createOrUpdateEvent(registrationData.getEvent(), input.getEventId());
            User user = userService.createOrUpdateUser(registrationData.getUser(), input.getUserId());

            // Criar o pagamento com conversão de moeda
            Payment payment = input.toPayment(event, user, currencyConversionService);

            log.info("Payment created with basePrice: {} BRL, finalPrice: {} {}",
                payment.getBasePrice(), payment.getFinalPrice(), payment.getCurrencyCode());

            PaymentMethodData paymentData = PaymentMethodFactory.createPaymentMethodData(input, payment);

            var gatewayStrategy = PaymentGatewayFactory.getPaymentGateway(payment.getGateway());
            var methodStrategy = PaymentMethodFactory.getPaymentMethod(payment.getMethod());

            PaymentResponse response = methodStrategy.pay(gatewayStrategy, paymentData);

            PaymentStatus finalStatus = determinePaymentStatus(response);
            response.getPayment().setStatus(finalStatus);

            String txId = response.getTransactionId();
            if (txId != null) response.getPayment().setGatewayTransactionId(txId);

            paymentRepository.save(response.getPayment());

            // Enviar notificação se o pagamento for aprovado
            notifyPaymentStatusIfApproved(finalStatus, input.getEventId(), input.getUserId());

            return response;

        } catch (Exception e) {
            log.error("Error processing payment", e);
            throw new RuntimeException(e.getMessage());
        }
    }

    private void notifyPaymentStatusIfApproved(PaymentStatus paymentStatus, String eventId, String userId) {
        if (paymentStatus == PaymentStatus.APPROVED) {
            try {
                log.info("About to send payment notification:");
                log.info("- eventId: {}", eventId);
                log.info("- userId: {}", userId);
                log.info("- paymentStatus (internal): {}", paymentStatus);

                paymentNotificationPublisher.publishPaymentNotification(eventId, userId, "ACCEPTED");

                log.info("Payment approved notification sent for eventId: {} and userId: {}", eventId, userId);
            } catch (Exception e) {
                log.error("Failed to send payment approval notification for eventId: {} and userId: {}", eventId, userId, e);
            }
        }
    }

    private PaymentStatus determinePaymentStatus(PaymentResponse response) {
        if (response.isApproved()) {
            return PaymentStatus.APPROVED;
        }

        if (response.getTransactionId() != null && response.getPixData() != null) {
            return PaymentStatus.PENDING;
        }

        return PaymentStatus.REJECTED;
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
        notifyPaymentStatusIfApproved(paymentStatus, String.valueOf(payment.getEvent().getId()), String.valueOf(payment.getUser().getId()));
        paymentRepository.save(payment);
    }

    @Override
    public List<Payment> findAllByEventId(String eventId) {
        return paymentRepository.findByEventId(UUID.fromString(eventId));
    }
}
