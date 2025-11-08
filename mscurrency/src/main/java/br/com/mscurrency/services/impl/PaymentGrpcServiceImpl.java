package br.com.mscurrency.services.impl;

import br.com.mscurrency.grpc.registration.CurrencyPriceServiceGrpc;
import br.com.mscurrency.grpc.registration.CurrencyPriceUpdateRequest;
import br.com.mscurrency.grpc.registration.CurrencyPriceUpdateResponse;
import br.com.mscurrency.models.CurrencyPrice;
import br.com.mscurrency.services.PaymentGrpcService;

import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class PaymentGrpcServiceImpl implements PaymentGrpcService {

    @GrpcClient("payment-service")
    private CurrencyPriceServiceGrpc.CurrencyPriceServiceBlockingStub currencyPriceStub;

    @Override
    public void sendCurrencyPriceUpdate(String currencyCode, Float priceBRL) {
        try {
            log.info("Sending currency price update to payment service: {} = {}", currencyCode, priceBRL);

            CurrencyPriceUpdateRequest request = CurrencyPriceUpdateRequest.newBuilder()
                    .setCurrencyCode(currencyCode)
                    .setPriceBRL(priceBRL)
                    .build();

            CurrencyPriceUpdateResponse response = currencyPriceStub.updateCurrencyPrice(request);

            if (response.getSuccess()) {
                log.info("Successfully sent currency price update for {}: {}", currencyCode, response.getMessage());
            } else {
                log.warn("Failed to send currency price update for {}: {}", currencyCode, response.getMessage());
            }
        } catch (Exception e) {
            log.error("Error sending currency price update for {} to payment service", currencyCode, e);
        }
    }

    @Override
    public void sendAllCurrencyPrices(List<CurrencyPrice> currencyPrices) {
        log.info("Sending all currency prices to payment service. Total: {}", currencyPrices.size());

        int successCount = 0;
        int errorCount = 0;

        for (CurrencyPrice currency : currencyPrices) {
            try {
                sendCurrencyPriceUpdate(currency.getCurrencyCode(), currency.getPriceBRL());
                successCount++;
            } catch (Exception e) {
                errorCount++;
                log.error("Failed to send currency {} to payment service", currency.getCurrencyCode(), e);
            }
        }

        log.info("Finished sending currency prices. Success: {}, Errors: {}", successCount, errorCount);
    }
}
