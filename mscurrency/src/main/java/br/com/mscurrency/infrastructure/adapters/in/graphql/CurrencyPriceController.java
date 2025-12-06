package br.com.mscurrency.infrastructure.adapters.in.graphql;

import br.com.mscurrency.domain.entity.CurrencyPrice;
import br.com.mscurrency.domain.ports.in.*;
import br.com.mscurrency.infrastructure.adapters.in.graphql.dto.CreateCurrencyPriceInput;
import br.com.mscurrency.infrastructure.adapters.in.graphql.dto.CurrencyPriceResponse;
import br.com.mscurrency.infrastructure.adapters.in.graphql.dto.UpdateCurrencyPriceInput;
import br.com.mscurrency.infrastructure.adapters.in.graphql.mapper.CurrencyPriceGraphQLMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;

/**
 * Controller GraphQL que adapta requisições GraphQL para os Use Cases
 * Este é um Adapter de ENTRADA (lado esquerdo do hexágono)
 */
@Controller
@RequiredArgsConstructor
@Slf4j
public class CurrencyPriceController {

    private final CreateCurrencyPricePort createCurrencyPricePort;
    private final UpdateCurrencyPricePort updateCurrencyPricePort;
    private final DeleteCurrencyPricePort deleteCurrencyPricePort;
    private final GetCurrencyPricePort getCurrencyPricePort;
    private final ListAllCurrencyPricesPort listAllCurrencyPricesPort;
    private final CurrencyPriceGraphQLMapper mapper;

    @QueryMapping
    public List<CurrencyPriceResponse> getAllCurrencyPrices() {
        log.info("GraphQL Query: getAllCurrencyPrices");

        List<CurrencyPrice> currencyPrices = listAllCurrencyPricesPort.listAll();
        return mapper.toResponseList(currencyPrices);
    }

    @QueryMapping
    public CurrencyPriceResponse getCurrencyPriceByCurrencyCode(@Argument String currencyCode) {
        log.info("GraphQL Query: getCurrencyPriceByCurrencyCode - code: {}", currencyCode);

        Optional<CurrencyPrice> currencyPrice = getCurrencyPricePort.getByCode(currencyCode);
        return currencyPrice.map(mapper::toResponse).orElse(null);
    }

    @QueryMapping
    public Boolean currencyPriceExists(@Argument String currencyCode) {
        log.info("GraphQL Query: currencyPriceExists - code: {}", currencyCode);

        return getCurrencyPricePort.exists(currencyCode);
    }

    @MutationMapping
    public CurrencyPriceResponse createCurrencyPrice(@Argument CreateCurrencyPriceInput input) {
        log.info("GraphQL Mutation: createCurrencyPrice - code: {}", input.getCurrencyCode());

        CurrencyPrice created = createCurrencyPricePort.create(
                input.getCurrencyCode(),
                input.getPriceBRL()
        );

        return mapper.toResponse(created);
    }

    @MutationMapping
    public CurrencyPriceResponse updateCurrencyPrice(@Argument UpdateCurrencyPriceInput input) {
        log.info("GraphQL Mutation: updateCurrencyPrice - code: {}", input.getCurrencyCode());

        CurrencyPrice updated = updateCurrencyPricePort.update(
                input.getCurrencyCode(),
                input.getPriceBRL()
        );

        return mapper.toResponse(updated);
    }

    @MutationMapping
    public Boolean deleteCurrencyPrice(@Argument String currencyCode) {
        log.info("GraphQL Mutation: deleteCurrencyPrice - code: {}", currencyCode);

        return deleteCurrencyPricePort.delete(currencyCode);
    }
}
