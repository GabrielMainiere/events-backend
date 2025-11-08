package br.com.mscurrency.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_currency_prices")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CurrencyPrice {
    @Id
    @Column(length = 3, nullable = false, unique = true)
    private String currencyCode; // Ex: "USD", "EUR", "BRL"

    @Column(name = "price_in_cents_brl", nullable = false)
    private Long priceInCentsBRL; // preço em centavos de real

    @Column(name = "last_updated", nullable = false)
    private LocalDateTime lastUpdated; // data/hora da última atualização

    @PrePersist
    @PreUpdate
    public void onUpdateTimestamp() {
        this.lastUpdated = LocalDateTime.now();
    }
}
