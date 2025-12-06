package br.com.mscurrency.domain.ports.in;

import br.com.mscurrency.domain.entity.CurrencyPrice;

import java.util.List;

/**
 * Port de entrada para listar todos os preços de moeda
 */
public interface ListAllCurrencyPricesPort {
    List<CurrencyPrice> listAll();
}

