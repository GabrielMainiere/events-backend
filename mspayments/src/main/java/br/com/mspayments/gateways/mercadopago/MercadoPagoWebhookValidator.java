package br.com.mspayments.gateways.mercadopago;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public class MercadoPagoWebhookValidator {

    /**
     * Valida um webhook do Mercado Pago comparando o HMAC.
     *
     * @param xSignature   O header x-signature recebido
     * @param xRequestId   O header x-request-id recebido
     * @param queryParams  Mapa com os query params da requisição (ex: data.id)
     * @param secret       A secret key cadastrada no Mercado Pago
     * @return true se HMAC for válido, false caso contrário
     */
    public static boolean validateWebhook(String xSignature, String xRequestId, Map<String, String> queryParams, String secret) {
        if (xSignature == null || xRequestId == null || secret == null || queryParams == null) {
            return false;
        }

        // 1. Extrair data.id do query params
        String dataId = queryParams.getOrDefault("data.id", "");
        dataId = dataId.toLowerCase();

        // 2. Separar x-signature em partes
        String[] parts = xSignature.split(",");
        String ts = null;
        String v1 = null;

        for (String part : parts) {
            String[] keyValue = part.split("=", 2);
            if (keyValue.length == 2) {
                String key = keyValue[0].trim();
                String value = keyValue[1].trim();
                if ("ts".equals(key)) {
                    ts = value;
                } else if ("v1".equals(key)) {
                    v1 = value;
                }
            }
        }

        if (ts == null || v1 == null) {
            return false; // cabeçalho inválido
        }

        // 3. Montar manifest string
        String manifest = String.format("id:%s;request-id:%s;ts:%s;", dataId, xRequestId, ts);

        try {
            // 4. Calcular HMAC-SHA256
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256_HMAC.init(secretKey);
            byte[] hashBytes = sha256_HMAC.doFinal(manifest.getBytes(StandardCharsets.UTF_8));

            // converter para hex
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b));
            }
            String calculatedHmac = sb.toString();

            // 5. Comparar com v1 do header
            return calculatedHmac.equalsIgnoreCase(v1);

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}