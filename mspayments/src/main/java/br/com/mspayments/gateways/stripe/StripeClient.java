package br.com.mspayments.gateways.stripe;

import br.com.mspayments.gateways.stripe.dtos.StripeCreditCardResponse;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

public class StripeClient {
    private static StripeClient instance;
    private final String secretKey;
    private static final String STRIPE_URL = "https://api.stripe.com/v1/charges";
    private final RestTemplate restTemplate;

    private StripeClient(String secretKey, RestTemplate restTemplate) {
        this.secretKey = secretKey;
        this.restTemplate = restTemplate;
    }

    public static StripeClient getInstance() {
        if (instance == null) {
            instance = new StripeClient(Dotenv.load().get("STRIPE_SECRET_KEY"), new RestTemplate());
        }
        return instance;
    }

    public StripeCreditCardResponse createCreditCardPayment(Map<String, String> payload) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBearerAuth(secretKey);

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        payload.forEach(formData::add);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(formData, headers);

        ResponseEntity<StripeCreditCardResponse> response = restTemplate.exchange(
                STRIPE_URL,
                HttpMethod.POST,
                entity,
                StripeCreditCardResponse.class
        );

        return response.getBody();
    }
}
