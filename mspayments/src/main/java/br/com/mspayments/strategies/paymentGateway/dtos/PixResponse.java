package br.com.mspayments.strategies.paymentGateway.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PixResponse {
    private String id;
    private String status;
    private String qrCode;
    private String qrCodeBase64;
}
