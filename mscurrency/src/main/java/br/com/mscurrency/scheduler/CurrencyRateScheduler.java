package br.com.mscurrency.scheduler;

import br.com.mscurrency.services.CurrencyRateUpdateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class CurrencyRateScheduler {

    private final CurrencyRateUpdateService currencyRateUpdateService;

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        log.info("Application ready - performing initial currency rate update");
        currencyRateUpdateService.updateCurrencyRatesFromApi();
    }

    @Scheduled(fixedRate = 10800000) // 3 horas = 3 * 60 * 60 * 1000 = 10800000 milliseconds
    public void updateCurrencyRatesScheduled() {
        log.info("Scheduled currency rate update started");
        currencyRateUpdateService.updateCurrencyRatesFromApi();
    }
}
