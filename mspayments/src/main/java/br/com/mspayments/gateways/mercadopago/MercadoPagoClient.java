package br.com.mspayments.gateways.mercadopago;

import br.com.mspayments.gateways.mercadopago.dtos.MercadoPagoPixRequest;
import br.com.mspayments.gateways.mercadopago.dtos.MercadoPagoPixResponse;
import br.com.mspayments.models.Payment;
import br.com.mspayments.strategies.paymentGateway.dtos.PixResponse;
import io.github.cdimascio.dotenv.Dotenv;
import org.jetbrains.annotations.NotNull;
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

    public PixResponse createPixPayment(Payment payment) {
        Map<String, Object> payload = generateCreatePixPayload(payment);

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

        MercadoPagoPixResponse mpResponse = response.getBody();

        if (mpResponse == null) return null;

        return getMpPixResponse(mpResponse);
    }

    @NotNull
    private static Map<String, Object> generateCreatePixPayload(Payment payment) {
        var request = new MercadoPagoPixRequest(payment);
        return Map.of(
                "transaction_amount", request.getTransactionAmount(),
                "description", request.getDescription(),
                "payment_method_id", "pix",
                "payer", Map.of("email", request.getPayerEmail())
        );
    }

    @NotNull
    private static PixResponse getMpPixResponse(MercadoPagoPixResponse mpResponse) {
        PixResponse pixResponse = new PixResponse();
        pixResponse.setId(mpResponse.getId());
        pixResponse.setStatus(mpResponse.getStatus());

        if (mpResponse.getPointOfInteraction() != null &&
                mpResponse.getPointOfInteraction().getTransactionData() != null) {

            pixResponse.setQrCode(mpResponse.getPointOfInteraction().getTransactionData().getQrCode());
            pixResponse.setQrCodeBase64(mpResponse.getPointOfInteraction().getTransactionData().getQrCodeBase64());
        }
        return pixResponse;
    }
}
