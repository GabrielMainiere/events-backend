package br.com.mscurrency.infrastructure.adapters.out.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entidade JPA para persistência de CurrencyPrice
 * Esta classe é um detalhe de implementação da infraestrutura
 */
@Entity
@Table(name = "tb_currency_prices")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CurrencyPriceEntity {

    @Id
    @Column(length = 3, nullable = false, unique = true)
    private String currencyCode;

    @Column(name = "price_brl", nullable = false)
    private Float priceBRL;

    @Column(name = "last_updated", nullable = false)
    private LocalDateTime lastUpdated;

    @PrePersist
    @PreUpdate
    public void onUpdateTimestamp() {
        this.lastUpdated = LocalDateTime.now();
    }
}