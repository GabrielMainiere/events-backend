package br.com.mscurrency.services.impl;

import br.com.mscurrency.config.RabbitMQConfig;
import br.com.mscurrency.dto.CurrencyPriceUpdateMessage;
import br.com.mscurrency.models.CurrencyPrice;
import br.com.mscurrency.services.PaymentNotificationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentNotificationServiceImpl implements PaymentNotificationService {

    private final RabbitTemplate rabbitTemplate;

    @Override
    public void sendCurrencyPriceUpdate(String currencyCode, Float priceBRL) {
        try {
            log.info("Sending currency price update to payment service via RabbitMQ: {} = {}", currencyCode, priceBRL);

            CurrencyPriceUpdateMessage message = new CurrencyPriceUpdateMessage(currencyCode, priceBRL);

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

    @Override
    public void sendAllCurrencyPrices(List<CurrencyPrice> currencyPrices) {
        log.info("Sending all currency prices to payment service via RabbitMQ. Total: {}", currencyPrices.size());

        int successCount = 0;
        int errorCount = 0;

        for (CurrencyPrice currency : currencyPrices) {
            try {
                sendCurrencyPriceUpdate(currency.getCurrencyCode(), currency.getPriceBRL());
                successCount++;
            } catch (Exception e) {
                errorCount++;
                log.error("Failed to send currency {} to payment service via RabbitMQ", currency.getCurrencyCode(), e);
            }
        }

        log.info("Finished sending currency prices via RabbitMQ. Success: {}, Errors: {}", successCount, errorCount);
    }
}
