package br.com.mspayments.strategies.paymentGateway;

import br.com.mspayments.gateways.stripe.StripeClient;
import br.com.mspayments.gateways.stripe.dtos.StripeCreditCardRequest;
import br.com.mspayments.gateways.stripe.mappers.StripeCreditCardMapper;
import br.com.mspayments.models.Payment;
import br.com.mspayments.strategies.paymentGateway.dtos.CreditCardResponse;
import br.com.mspayments.strategies.paymentGateway.dtos.PixResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@AllArgsConstructor
public class StripePaymentGateway implements PaymentGatewayStrategy {
    private final StripeClient stripeClient;

    public StripePaymentGateway() {
        this.stripeClient = StripeClient.getInstance();
    }

    @Override
    public PixResponse processPix(Payment payment) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public CreditCardResponse processCreditCard(Payment payment, String cardToken, String paymentMethodId) {
        try {
            // Regras de negócio do cartão de crédito no Stripe
            var payload = generateCreateCreditCardPayload(payment, cardToken);
            var stripeResponse = stripeClient.createCreditCardPayment(payload);
            return StripeCreditCardMapper.toCreditCardResponse(stripeResponse);
        } catch (Exception e) {
            log.error("Error processing credit card payment on Stripe: {}", e.getMessage(), e);
            // Retorna um pagamento rejeitado em caso de erro
            CreditCardResponse errorResponse = new CreditCardResponse();
            errorResponse.setStatus("rejected");
            return errorResponse;
        }
    }

    private static Map<String, String> generateCreateCreditCardPayload(Payment payment, String cardToken) {
        var request = new StripeCreditCardRequest(payment, cardToken);
        Map<String, String> payload = new HashMap<>();
        payload.put("amount", request.getAmount().toString());
        payload.put("currency", request.getCurrency());
        payload.put("source", request.getSource());
        payload.put("description", request.getDescription());
        payload.put("receipt_email", request.getReceiptEmail());

        return payload;
    }
}
