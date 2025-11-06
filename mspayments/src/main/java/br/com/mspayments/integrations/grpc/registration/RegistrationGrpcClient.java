package br.com.mspayments.integrations.grpc.registration;

import br.com.mspayments.grpc.registration.GetRegistrationRequest;
import br.com.mspayments.grpc.registration.GetRegistrationResponse;
import br.com.mspayments.grpc.registration.EventRegistrationPaymentsServiceGrpc;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
@Slf4j
public class RegistrationGrpcClient {

    private final String msEventsRegistrationUrl;
    private ManagedChannel channel;
    private EventRegistrationPaymentsServiceGrpc.EventRegistrationPaymentsServiceBlockingStub stub;

    public RegistrationGrpcClient(@Value("${ms.events.registration.url}") String msEventsRegistrationUrl) {
        this.msEventsRegistrationUrl = msEventsRegistrationUrl;
        initializeChannel();
    }

    private void initializeChannel() {
        // Extrair host e porta da URL
        String host = extractHost(msEventsRegistrationUrl);
        int port = extractPort(msEventsRegistrationUrl);
        
        this.channel = ManagedChannelBuilder.forAddress(host, port)
                .usePlaintext() // Para desenvolvimento (sem TLS)
                .build();
        
        this.stub = EventRegistrationPaymentsServiceGrpc.newBlockingStub(channel);
    }

    public GetRegistrationResponse getRegistration(String userId, String eventId) {
        try {
            GetRegistrationRequest request = GetRegistrationRequest.newBuilder()
                    .setUserId(userId)
                    .setEventId(eventId)
                    .build();

            GetRegistrationResponse response = stub.getRegistration(request);
            return response;
        } catch (Exception e) {
            log.error("Error calling registration service", e);
            throw new RuntimeException("Failed to get registration from ms-events-registration", e);
        }
    }

    private String extractHost(String url) {
        try {
            String cleanUrl = url.replaceFirst("^https?://", "");
            return cleanUrl.split(":")[0];
        } catch (Exception e) {
            log.warn("Failed to extract host from URL: {}, using localhost", url);
            return "localhost";
        }
    }

    private int extractPort(String url) {
        try {
            String cleanUrl = url.replaceFirst("^https?://", "");
            String[] parts = cleanUrl.split(":");
            if (parts.length > 1) {
                return Integer.parseInt(parts[1]);
            }
        } catch (Exception e) {
            log.warn("Failed to extract port from URL: {}, using default 50051", url);
        }
        return 50051; // Default gRPC port
    }

    public void shutdown() {
        if (channel != null && !channel.isShutdown()) {
            try {
                channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
            } catch (InterruptedException e) {
                log.warn("Interrupted while shutting down gRPC channel", e);
                Thread.currentThread().interrupt();
            }
        }
    }
}
