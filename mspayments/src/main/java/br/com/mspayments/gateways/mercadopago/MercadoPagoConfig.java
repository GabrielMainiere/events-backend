package br.com.mspayments.gateways.mercadopago;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MercadoPagoConfig {
    @Bean
    public String mercadoPagoAccessToken(Dotenv dotenv) {
        return dotenv.get("MERCADO_PAGO_ACCESS_TOKEN");
    }
    @Bean
    public String mercadoPagoWebhookKey(Dotenv dotenv) {
        return dotenv.get("MERCADO_PAGO_WEBHOOK_KEY");
    }
}
