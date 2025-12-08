package br.com.mspayments.publishers;

import br.com.mspayments.dtos.PaymentNotificationMessage;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import static br.com.mspayments.config.RabbitMQConfig.REGISTRATION_EXCHANGE;
import static br.com.mspayments.config.RabbitMQConfig.REGISTRATION_ROUTING_KEY;

@Service
@AllArgsConstructor
@Slf4j
public class RabbitMQPaymentNotificationPublisher implements PaymentNotificationPublisher {

    private final RabbitTemplate rabbitTemplate;

    @Override
    public void publishPaymentNotification(String eventId, String userId, String status) {
        try {
            PaymentNotificationMessage.PaymentNotificationData data =
                new PaymentNotificationMessage.PaymentNotificationData(eventId, userId, status);

            PaymentNotificationMessage message = new PaymentNotificationMessage(
                REGISTRATION_ROUTING_KEY,
                data
            );

            rabbitTemplate.convertAndSend(REGISTRATION_EXCHANGE, REGISTRATION_ROUTING_KEY, message);

            log.info("Payment notification published to RabbitMQ - eventId: {}, userId: {}, status: {}",
                eventId, userId, status);
        } catch (Exception e) {
            log.error("Failed to publish payment notification for eventId: {} and userId: {}",
                eventId, userId, e);
            throw e;
        }
    }
}

