package br.com.mscurrency.infrastructure.adapters.in.scheduler;

import br.com.mscurrency.application.usecase.SyncCurrencyRatesUseCase;
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

    private final SyncCurrencyRatesUseCase syncCurrencyRatesUseCase;

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        log.info("Application ready - performing initial operations");

        syncCurrencyRatesUseCase.syncOnStartup();
    }

    @Scheduled(fixedRate = 10800000) // 3 horas = 3 * 60 * 60 * 1000 = 10800000 milliseconds
    public void updateCurrencyRatesScheduled() {
        log.info("Scheduled currency rate update started");
        syncCurrencyRatesUseCase.syncRates();
        log.info("Scheduled currency rate update finished");
    }
}
