package br.com.mscurrency.infrastructure.adapters.out.persistence.mapper;

import br.com.mscurrency.domain.entity.CurrencyPrice;
import br.com.mscurrency.infrastructure.adapters.out.persistence.entity.CurrencyPriceEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper para converter entre CurrencyPrice (domínio) e CurrencyPriceEntity (JPA)
 */
@Component
public class CurrencyPriceMapper {

    /**
     * Converte de Entity (JPA) para Domain
     */
    public CurrencyPrice toDomain(CurrencyPriceEntity entity) {
        if (entity == null) {
            return null;
        }

        return CurrencyPrice.reconstruct(
                entity.getCurrencyCode(),
                entity.getPriceBRL(),
                entity.getLastUpdated()
        );
    }

    /**
     * Converte de Domain para Entity (JPA)
     */
    public CurrencyPriceEntity toEntity(CurrencyPrice domain) {
        if (domain == null) {
            return null;
        }

        return new CurrencyPriceEntity(
                domain.getCurrencyCodeValue(),
                domain.getPriceValue(),
                domain.getLastUpdated()
        );
    }

    /**
     * Converte lista de Entity para lista de Domain
     */
    public List<CurrencyPrice> toDomainList(List<CurrencyPriceEntity> entities) {
        if (entities == null) {
            return List.of();
        }

        return entities.stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    /**
     * Converte lista de Domain para lista de Entity
     */
    public List<CurrencyPriceEntity> toEntityList(List<CurrencyPrice> domains) {
        if (domains == null) {
            return List.of();
        }

        return domains.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }
}


