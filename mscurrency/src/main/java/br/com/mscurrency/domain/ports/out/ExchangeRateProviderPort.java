package br.com.mscurrency.domain.ports.out;

import java.util.Map;

/**
 * Port de saída para obter taxas de câmbio de um provedor externo
 * Esta interface será implementada pelo adaptador da API externa (ExchangeRate-API)
 */
public interface ExchangeRateProviderPort {
    /**
     * Obtém as taxas de conversão de BRL para outras moedas
     */
    Map<String, Float> getExchangeRates();

}

