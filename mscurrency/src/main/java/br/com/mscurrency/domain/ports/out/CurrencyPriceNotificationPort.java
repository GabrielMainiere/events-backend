package br.com.mscurrency.domain.ports.out;

import br.com.mscurrency.domain.entity.CurrencyPrice;

import java.util.List;

/**
 * Port de saída para notificar outros serviços sobre mudanças em preços de moeda
 * Esta interface será implementada pelo adaptador de mensageria (RabbitMQ)
 */
public interface CurrencyPriceNotificationPort {
    /**
     * Notifica sobre a atualização de um preço de moeda
     */
    void notifyPriceUpdate(CurrencyPrice currencyPrice);

    /**
     * Notifica sobre múltiplas atualizações de preços (usado na sincronização)
     */
    void notifyBulkPriceUpdate(List<CurrencyPrice> currencyPrices);
}

