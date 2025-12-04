package br.com.mspaymentsrefactor.domain.entities;

import br.com.mspaymentsrefactor.domain.valueobjects.Money;
import br.com.mspaymentsrefactor.domain.valueobjects.SalePeriod;

import java.util.Objects;
import java.util.UUID;

/**
 * Entidade que representa um evento
 */
public class Event {
    private UUID id;
    private String title;
    private String description;
    private Money price;

    public Event(UUID id, String title, String description, SalePeriod salePeriod, Money price) {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("Title cannot be null or empty");
        }

        if (salePeriod == null) {
            throw new IllegalArgumentException("Sale period cannot be null");
        }
        if (price == null) {
            throw new IllegalArgumentException("Price cannot be null");
        }

        this.id = id != null ? id : UUID.randomUUID();
        this.title = title;
        this.description = description;
        this.price = price;
    }

    public UUID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return Objects.equals(id, event.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return String.format("Event[id=%s, title=%s, price=%s]", id, title, price);
    }
}

