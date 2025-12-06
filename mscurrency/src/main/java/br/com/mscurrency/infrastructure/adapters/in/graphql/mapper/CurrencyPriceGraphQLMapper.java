package br.com.mscurrency.infrastructure.adapters.in.graphql.mapper;

import br.com.mscurrency.domain.entity.CurrencyPrice;
import br.com.mscurrency.infrastructure.adapters.in.graphql.dto.CurrencyPriceResponse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper para converter entre CurrencyPrice (domínio) e CurrencyPriceResponse (GraphQL)
 */
@Component
public class CurrencyPriceGraphQLMapper {

    /**
     * Converte de Domain para Response DTO
     */
    public CurrencyPriceResponse toResponse(CurrencyPrice domain) {
        if (domain == null) {
            return null;
        }

        return new CurrencyPriceResponse(
                domain.getCurrencyCodeValue(),
                domain.getPriceValue(),
                domain.getLastUpdated()
        );
    }

    /**
     * Converte lista de Domain para lista de Response DTO
     */
    public List<CurrencyPriceResponse> toResponseList(List<CurrencyPrice> domains) {
        if (domains == null) {
            return List.of();
        }

        return domains.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
}

