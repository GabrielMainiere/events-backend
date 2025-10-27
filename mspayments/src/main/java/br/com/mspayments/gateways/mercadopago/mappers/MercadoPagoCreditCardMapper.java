package br.com.mspayments.gateways.mercadopago.mappers;

import br.com.mspayments.gateways.mercadopago.dtos.MercadoPagoCreditCardResponse;
import br.com.mspayments.strategies.paymentGateway.dtos.CreditCardResponse;

public class MercadoPagoCreditCardMapper {

    public static CreditCardResponse toCreditCardResponse(MercadoPagoCreditCardResponse mpResponse) {
        CreditCardResponse response = new CreditCardResponse();
        response.setId(mpResponse.getId());
        response.setStatus(mpResponse.getStatus());

        return response;
    }
}
