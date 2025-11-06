package br.com.mspayments.services;

import br.com.mspayments.controllers.PaymentResponse;
import br.com.mspayments.controllers.dtos.CreatePaymentInput;
import br.com.mspayments.controllers.dtos.EventData;
import br.com.mspayments.controllers.dtos.RegistrationData;
import br.com.mspayments.integrations.grpc.registration.RegistrationGrpcClient;
import br.com.mspayments.grpc.registration.GetRegistrationResponse;
import br.com.mspayments.models.Event;
import br.com.mspayments.models.Payment;
import br.com.mspayments.models.PaymentStatus;
import br.com.mspayments.models.User;
import br.com.mspayments.repositories.PaymentRepository;
import br.com.mspayments.repositories.EventRepository;
import br.com.mspayments.repositories.UserRepository;
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
    private final RegistrationGrpcClient registrationGrpcClient;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    @Override
    public PaymentResponse create(CreatePaymentInput input) {
        try {
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

            Event event = createOrUpdateEvent(registrationData.getEvent(), input.getEventId());
            User user = createOrUpdateUser(registrationData.getUser(), input.getUserId());

            PaymentMethodData paymentData = PaymentMethodFactory.createPaymentMethodData(input, event, user);

            paymentData.getPayment().setCreatedAt(Instant.now());
            paymentData.getPayment().setStatus(PaymentStatus.PENDING);

            var gatewayStrategy = PaymentGatewayFactory.getPaymentGateway(paymentData.getPayment().getGateway());
            var methodStrategy = PaymentMethodFactory.getPaymentMethod(paymentData.getPayment().getMethod());

            PaymentResponse response = methodStrategy.pay(gatewayStrategy, paymentData);

            PaymentStatus finalStatus = determinePaymentStatus(response);
            response.getPayment().setStatus(finalStatus);

            String txId = response.getTransactionId();
            if (txId != null) response.getPayment().setGatewayTransactionId(txId);

            paymentRepository.save(response.getPayment());
            return response;

        } catch (Exception e) {
            log.error("Erro ao processar pagamento", e);

            // Verificar se é erro de gRPC ou registro não encontrado
            if (e.getMessage() != null && (e.getMessage().contains("UNAVAILABLE") ||
                e.getMessage().contains("UNIMPLEMENTED") ||
                e.getMessage().contains("registro não encontrado") ||
                e.getMessage().contains("Não há pagamentos pendentes"))) {
                throw new RuntimeException("Não há pagamentos pendentes");
            }

            Payment rejectedPayment = input.toPayment(null, null);
            rejectedPayment.setCreatedAt(Instant.now());
            rejectedPayment.setStatus(PaymentStatus.REJECTED);

            paymentRepository.save(rejectedPayment);

            return new PaymentResponse(rejectedPayment);
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
        paymentRepository.save(payment);
    }

    @Override
    public List<Payment> findAllByEventId(String eventId) {
        return paymentRepository.findByEventId(UUID.fromString(eventId));
    }

    private Event createOrUpdateEvent(EventData eventData, String eventId) {
        UUID eventUuid = null;
        try {
            eventUuid = UUID.fromString(eventId);
            var existingEvent = eventRepository.findById(eventUuid);
            if (existingEvent.isPresent()) {
                return existingEvent.get();
            }
        } catch (IllegalArgumentException e) {
        }

        Event event = new Event();
        event.setId(eventUuid);
        event.setTitle(eventData.getTitle());
        event.setDescription(eventData.getDescription());
        event.setStartAt(parseInstant(eventData.getStartAt()));
        event.setEndAt(parseInstant(eventData.getEndAt()));
        event.setPrice(eventData.getPrice());
        event.setSaleStartAt(parseInstant(eventData.getSaleStartAt()));
        event.setSaleEndAt(parseInstant(eventData.getSaleEndAt()));

        return eventRepository.save(event);
    }

    private User createOrUpdateUser(br.com.mspayments.controllers.dtos.UserData userData, String userId) {
        var existingUser = userRepository.findByCpf(userData.getCpf());
        if (existingUser.isPresent()) {
            return existingUser.get();
        }

        // Criar novo usuário
        br.com.mspayments.models.User user = new br.com.mspayments.models.User();
        user.setName(userData.getName());
        user.setEmail(userData.getEmail());
        user.setCpf(userData.getCpf());

        return userRepository.save(user);
    }

    private Instant parseInstant(String dateTimeString) {
        try {
            return Instant.parse(dateTimeString);
        } catch (Exception e) {
            log.warn("Failed to parse datetime: {}, using current time", dateTimeString);
            return Instant.now();
        }
    }
}
