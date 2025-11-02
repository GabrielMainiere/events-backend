package br.com.mspayments.gateways.stripe.mappers;

import br.com.mspayments.gateways.stripe.dtos.StripeCreditCardResponse;
import br.com.mspayments.strategies.paymentGateway.dtos.CreditCardResponse;

public class StripeCreditCardMapper {

    public static CreditCardResponse toCreditCardResponse(StripeCreditCardResponse stripeResponse) {
        if (stripeResponse == null) {
            return new CreditCardResponse();
        }

        CreditCardResponse response = new CreditCardResponse();
        response.setId(stripeResponse.getId());

        // Mapear status do Stripe para padrão da aplicação
        if (stripeResponse.getPaid() != null && stripeResponse.getPaid()) {
            response.setStatus("approved");
        } else if (stripeResponse.getFailureCode() != null) {
            response.setStatus("rejected");
        } else {
            response.setStatus("pending");
        }

        return response;
    }
}
