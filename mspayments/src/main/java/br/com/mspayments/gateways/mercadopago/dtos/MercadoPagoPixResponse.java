package br.com.mspayments.gateways.mercadopago.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MercadoPagoPixResponse {

    private String id;
    private String status;

    @JsonProperty("point_of_interaction")
    public PointOfInteraction pointOfInteraction;

    @Data
    @Getter
    public static class PointOfInteraction {
        @JsonProperty("transaction_data")
        private TransactionData transactionData;

    }

    @Data
    public static class TransactionData {
        @JsonProperty("qr_code")
        private String qrCode;

        @JsonProperty("qr_code_base64")
        private String qrCodeBase64;
    }
}
