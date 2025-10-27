package br.com.mspayments.gateways.mercadopago.mappers;

import br.com.mspayments.gateways.mercadopago.dtos.MercadoPagoPixResponse;
import br.com.mspayments.strategies.paymentGateway.dtos.PixResponse;

public class MercadoPagoPixMapper {
    public static PixResponse toPixResponse(MercadoPagoPixResponse mpResponse) {
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
