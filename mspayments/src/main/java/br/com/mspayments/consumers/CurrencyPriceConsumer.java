package br.com.mspayments.consumers;

import br.com.mspayments.dtos.CurrencyPriceUpdateMessage;
import br.com.mspayments.services.CurrencyPriceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import static br.com.mspayments.config.RabbitMQConfig.CURRENCY_QUEUE;

@Component
@Slf4j
@RequiredArgsConstructor
public class CurrencyPriceConsumer {

    private final CurrencyPriceService currencyPriceService;

    @RabbitListener(queues = CURRENCY_QUEUE)
    public void receiveCurrencyPriceUpdate(CurrencyPriceUpdateMessage message) {
        log.info("Received currency price update via RabbitMQ - Currency: {}, Price BRL: {}",
                message.getCurrencyCode(), message.getPriceBRL());

        try {
            currencyPriceService.updateCurrencyPrice(message.getCurrencyCode(), message.getPriceBRL());
            log.info("Successfully updated currency price for: {}", message.getCurrencyCode());
        } catch (Exception e) {
            log.error("Error updating currency price for {}: {}", message.getCurrencyCode(), e.getMessage(), e);
            throw e; // Re-throw to trigger retry or DLQ mechanism
        }
    }
}

