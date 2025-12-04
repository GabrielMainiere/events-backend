package br.com.mspaymentsrefactor.domain.factories;

import br.com.mspaymentsrefactor.domain.aggregates.Payment;
import br.com.mspaymentsrefactor.domain.entities.CurrencyPrice;
import br.com.mspaymentsrefactor.domain.entities.Event;
import br.com.mspaymentsrefactor.domain.valueobjects.Money;
import br.com.mspaymentsrefactor.domain.valueobjects.PaymentGateway;
import br.com.mspaymentsrefactor.domain.valueobjects.PaymentMethod;
import br.com.mspaymentsrefactor.domain.valueobjects.PaymentStatus;

import java.time.Instant;
import java.util.UUID;

/**
 * Factory para criação de agregados Payment
 * Encapsula a lógica de criação e conversão de moeda
 */
public class PaymentFactory {

    /**
     * Cria um novo pagamento com conversão de moeda
     *
     * @param eventId ID do evento
     * @param userId ID do usuário
     * @param event Evento para obter o preço base
     * @param targetCurrencyCode Código da moeda desejada (USD, EUR, BRL, etc.)
     * @param currencyPrice Cotação da moeda para conversão
     * @param method Método de pagamento
     * @param gateway Gateway de pagamento
     * @return Novo pagamento criado
     */
    public static Payment createPayment(
            UUID eventId,
            UUID userId,
            Event event,
            String targetCurrencyCode,
            CurrencyPrice currencyPrice,
            PaymentMethod method,
            PaymentGateway gateway) {

        if (event == null) {
            throw new IllegalArgumentException("Event cannot be null");
        }
        if (targetCurrencyCode == null || targetCurrencyCode.isBlank()) {
            throw new IllegalArgumentException("Target currency code cannot be null or empty");
        }

        Money basePrice = event.getPrice(); // Preço base em BRL do evento

        Money finalPrice;
        if (targetCurrencyCode.equalsIgnoreCase("BRL")) {
            // Sem conversão necessária
            finalPrice = basePrice;
        } else {
            if (currencyPrice == null) {
                throw new IllegalArgumentException(
                    String.format("Currency price for %s is required", targetCurrencyCode)
                );
            }
            // Converte o preço para a moeda alvo
            finalPrice = basePrice.convertTo(targetCurrencyCode, currencyPrice.getConversionRate());
        }

        return new Payment(eventId, userId, basePrice, finalPrice, method, gateway);
    }

    /**
     * Cria um novo pagamento em BRL (sem conversão)
     *
     * @param eventId ID do evento
     * @param userId ID do usuário
     * @param event Evento para obter o preço
     * @param method Método de pagamento
     * @param gateway Gateway de pagamento
     * @return Novo pagamento criado em BRL
     */
    public static Payment createPaymentInBRL(
            UUID eventId,
            UUID userId,
            Event event,
            PaymentMethod method,
            PaymentGateway gateway) {

        if (event == null) {
            throw new IllegalArgumentException("Event cannot be null");
        }

        Money basePrice = event.getPrice();

        return new Payment(eventId, userId, basePrice, basePrice, method, gateway);
    }

    /**
     * Valida se um evento está disponível para compra
     *
     * @param event Evento a ser validado
     * @throws IllegalStateException se o evento não estiver disponível para compra
     */
    public static void validateEventAvailableForPurchase(Event event) {
        if (event == null) {
            throw new IllegalArgumentException("Event cannot be null");
        }
        if (!event.isTicketSaleOpen()) {
            throw new IllegalStateException(
                String.format("Ticket sales are not open for event %s", event.getId())
            );
        }
    }
}

