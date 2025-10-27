package br.com.mspayments.gateways.mercadopago;

import br.com.mspayments.models.PaymentStatus;
import br.com.mspayments.services.PaymentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.Map;

@RestController
@RequestMapping("/mp-webhook")
public class MercadoPagoWebhook {
    private final PaymentService paymentService;
    @Value("#{ @mercadoPagoWebhookKey }")
    private String WEBHOOK_SECRET;

    public MercadoPagoWebhook(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public ResponseEntity<String> receivePaymentStatus(
            HttpServletRequest request,
            @RequestHeader("x-signature") String xSignature,
            @RequestHeader("x-request-id") String xRequestId
    ) {
        try {
            byte[] bodyBytes = StreamUtils.copyToByteArray(request.getInputStream());
            String body = new String(bodyBytes, StandardCharsets.UTF_8);

            // Extrair data.id do body JSON
            String paymentId = extractPaymentId(body);;

            Map<String, String> queryParams = Map.of("data.id", paymentId);
            boolean valid = MercadoPagoWebhookValidator.validateWebhook(
                    xSignature,
                    xRequestId,
                    queryParams,
                    WEBHOOK_SECRET
            );

            if (!valid) {
                System.out.println("Webhook inválido! Assinatura não conferiu.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid signature");
            }

            // Webhook válido
            System.out.println("Webhook recebido e validado!");

            // Não achei opção do mercado pago para simular pagamento negado ou aprovado
            // então estou assumindo que qualquer webhook recebido é de pagamento aprovado
            // apenas para fins de exemplo
            paymentService.updatePaymentStatus(paymentId, PaymentStatus.APPROVED);
            return ResponseEntity.ok("ok");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("erro interno");
        }
    }

    @NotNull
    private static String extractPaymentId(String body) throws JsonProcessingException {
        String dataId = "";
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(body);
        if (jsonNode.has("data") && jsonNode.get("data").has("id")) {
            dataId = jsonNode.get("data").get("id").asText().toLowerCase();
        }
        return dataId;

    }
}