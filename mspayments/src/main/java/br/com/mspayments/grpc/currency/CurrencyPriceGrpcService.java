package br.com.mspayments.grpc.currency;

import br.com.mspayments.services.CurrencyPriceServiceImpl;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.server.service.GrpcService;

@GrpcService
@RequiredArgsConstructor
@Slf4j
public class CurrencyPriceGrpcService extends CurrencyPriceServiceGrpc.CurrencyPriceServiceImplBase {

    private final CurrencyPriceServiceImpl currencyPriceServiceImpl;

    @Override
    public void updateCurrencyPrice(CurrencyPriceUpdateRequest request,
                                   StreamObserver<CurrencyPriceUpdateResponse> responseObserver) {

        log.info("Received currency price update request for {} with price {}",
                request.getCurrencyCode(), request.getPriceBRL());

        try {
            currencyPriceServiceImpl.updateCurrencyPrice(
                request.getCurrencyCode(),
                request.getPriceBRL()
            );

            CurrencyPriceUpdateResponse response = CurrencyPriceUpdateResponse.newBuilder()
                    .setSuccess(true)
                    .setMessage("Currency price updated successfully")
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();

            log.info("Currency price update completed successfully for {}", request.getCurrencyCode());

        } catch (Exception e) {
            log.error("Error updating currency price for {}: {}", request.getCurrencyCode(), e.getMessage());

            CurrencyPriceUpdateResponse response = CurrencyPriceUpdateResponse.newBuilder()
                    .setSuccess(false)
                    .setMessage("Error updating currency price: " + e.getMessage())
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }
}
