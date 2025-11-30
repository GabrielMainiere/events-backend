package br.com.mscurrency.scheduler;

import br.com.mscurrency.models.CurrencyPrice;
import br.com.mscurrency.services.CurrencyPriceService;
import br.com.mscurrency.services.CurrencyRateUpdateService;
import br.com.mscurrency.services.PaymentNotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class CurrencyRateScheduler {

    private final CurrencyRateUpdateService currencyRateUpdateService;
    private final PaymentNotificationService paymentNotificationService;
    private final CurrencyPriceService currencyPriceService;

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        log.info("Application ready - performing initial operations");

        // Enviar todas as moedas do banco para o microsserviço de pagamentos via RabbitMQ
        List<CurrencyPrice> allCurrencies = currencyPriceService.findAll();
        if (!allCurrencies.isEmpty()) {
            log.info("Sending all {} currencies to payment service via RabbitMQ", allCurrencies.size());
            paymentNotificationService.sendAllCurrencyPrices(allCurrencies);
        }

        log.info("No currencies found in database to send to payment service");
        // Depois faz a atualização das taxas via API
        log.info("Performing initial currency rate update from API");
        currencyRateUpdateService.updateCurrencyRatesFromApi();
    }

    @Scheduled(fixedRate = 10800000) // 3 horas = 3 * 60 * 60 * 1000 = 10800000 milliseconds
    public void updateCurrencyRatesScheduled() {
        log.info("Scheduled currency rate update started");
        currencyRateUpdateService.updateCurrencyRatesFromApi();
    }
}
