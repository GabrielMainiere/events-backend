package br.com.mspayments.gateways.mercadopago;

import br.com.mspayments.gateways.mercadopago.dtos.MercadoPagoCreditCardResponse;
import br.com.mspayments.gateways.mercadopago.dtos.MercadoPagoPixResponse;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.UUID;

public class MercadoPagoClient {
    private static MercadoPagoClient instance;
    private final String accessToken;
    private static final String MP_URL = "https://api.mercadopago.com/v1/payments";
    private final RestTemplate restTemplate;

    private MercadoPagoClient(String accessToken, RestTemplate restTemplate) {
        this.accessToken = accessToken;
        this.restTemplate = restTemplate;
    }
    public static MercadoPagoClient getInstance() {
        if (instance == null) {
            instance = new MercadoPagoClient(Dotenv.load().get("MERCADO_PAGO_ACCESS_TOKEN"), new RestTemplate());
        }
        return instance;
    }

    public MercadoPagoPixResponse createPixPayment(Map<String, Object> payload) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);
        headers.set("X-Idempotency-Key", UUID.randomUUID().toString());

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

        ResponseEntity<MercadoPagoPixResponse> response = restTemplate.exchange(
                MP_URL,
                HttpMethod.POST,
                entity,
                MercadoPagoPixResponse.class
        );

        return response.getBody();
    }

    public MercadoPagoCreditCardResponse createCreditCardPayment(Map<String, Object> payload) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);
        headers.set("X-Idempotency-Key", UUID.randomUUID().toString());

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

        ResponseEntity<MercadoPagoCreditCardResponse> response = restTemplate.exchange(
                MP_URL,
                HttpMethod.POST,
                entity,
                MercadoPagoCreditCardResponse.class
        );

        return response.getBody();
    }
}
