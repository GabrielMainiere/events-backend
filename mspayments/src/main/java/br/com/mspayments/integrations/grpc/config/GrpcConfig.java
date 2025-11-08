package br.com.mspayments.integrations.grpc.config;

import br.com.mspayments.integrations.grpc.registration.RegistrationGrpcClient;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.EventListener;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@AllArgsConstructor
@Slf4j
public class GrpcConfig {

    private final RegistrationGrpcClient registrationGrpcClient;

    @EventListener
    public void onApplicationShutdown(ContextClosedEvent event) {
        log.info("Shutting down gRPC clients...");
        registrationGrpcClient.shutdown();
    }
}
