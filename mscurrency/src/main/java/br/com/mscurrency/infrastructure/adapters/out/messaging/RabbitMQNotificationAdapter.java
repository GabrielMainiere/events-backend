package br.com.mscurrency.infrastructure.adapters.out.messaging;

import br.com.mscurrency.domain.entity.CurrencyPrice;
import br.com.mscurrency.domain.ports.out.CurrencyPriceNotificationPort;
import br.com.mscurrency.infrastructure.adapters.out.messaging.dto.CurrencyPriceUpdateMessage;
import br.com.mscurrency.infrastructure.config.RabbitMQConfig;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class RabbitMQNotificationAdapter implements CurrencyPriceNotificationPort {
    private final RabbitTemplate rabbitTemplate;

    @Override
    public void notifyPriceUpdate(CurrencyPrice currencyPrice) {
        String currencyCode = currencyPrice.getCurrencyCodeValue();
        Float priceBRL = currencyPrice.getPriceValue();
        try {
            log.info("Sending currency price update to payment service via RabbitMQ: {} = {}", currencyCode, priceBRL);

            CurrencyPriceUpdateMessage message = new CurrencyPriceUpdateMessage(currencyCode, currencyPrice.getPriceValue());

            rabbitTemplate.convertAndSend(
                    RabbitMQConfig.EXCHANGE,
                    RabbitMQConfig.ROUTING_KEY,
                    message
            );

            log.info("Successfully sent currency price update for {} via RabbitMQ", currencyCode);
        } catch (Exception e) {
            log.error("Error sending currency price update for {} to payment service via RabbitMQ", currencyCode, e);
        }
    }
}
