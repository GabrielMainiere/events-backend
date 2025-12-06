package br.com.mscurrency.domain.ports.in;

/**
 * Port de entrada para deletar um preço de moeda
 */
public interface DeleteCurrencyPricePort {
    boolean delete(String currencyCode);
}

