package br.com.mscurrency.controllers;

import br.com.mscurrency.dto.CreateCurrencyPriceInput;
import br.com.mscurrency.dto.UpdateCurrencyPriceInput;
import br.com.mscurrency.models.CurrencyPrice;
import br.com.mscurrency.services.CurrencyPriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class CurrencyPriceController {

    private final CurrencyPriceService currencyPriceService;

    @QueryMapping
    public List<CurrencyPrice> getAllCurrencyPrices() {
        return currencyPriceService.findAll();
    }

    @QueryMapping
    public Optional<CurrencyPrice> getCurrencyPriceByCurrencyCode(@Argument String currencyCode) {
        return currencyPriceService.findByCurrencyCode(currencyCode);
    }

    @MutationMapping
    public CurrencyPrice createCurrencyPrice(@Argument CreateCurrencyPriceInput input) {
        return currencyPriceService.createCurrencyPrice(input.getCurrencyCode(), input.getPriceInCentsBRL());
    }

    @MutationMapping
    public CurrencyPrice updateCurrencyPrice(@Argument UpdateCurrencyPriceInput input) {
        return currencyPriceService.updateCurrencyPrice(input.getCurrencyCode(), input.getPriceInCentsBRL());
    }

    @MutationMapping
    public Boolean deleteCurrencyPrice(@Argument String currencyCode) {
        return currencyPriceService.deleteCurrencyPrice(currencyCode);
    }

    @QueryMapping
    public Boolean currencyPriceExists(@Argument String currencyCode) {
        return currencyPriceService.existsByCurrencyCode(currencyCode);
    }
}
