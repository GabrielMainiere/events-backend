package br.com.mspaymentsrefactor.domain.entities;

import br.com.mspaymentsrefactor.domain.valueobjects.EventPeriod;
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
    private EventPeriod eventPeriod;
    private SalePeriod salePeriod;
    private Money price;

    public Event(UUID id, String title, String description,
                 EventPeriod eventPeriod, SalePeriod salePeriod, Money price) {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("Title cannot be null or empty");
        }
        if (eventPeriod == null) {
            throw new IllegalArgumentException("Event period cannot be null");
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
        this.eventPeriod = eventPeriod;
        this.salePeriod = salePeriod;
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

    public EventPeriod getEventPeriod() {
        return eventPeriod;
    }

    public SalePeriod getSalePeriod() {
        return salePeriod;
    }

    public Money getPrice() {
        return price;
    }

    public boolean isTicketSaleOpen() {
        return salePeriod.isOpen();
    }

    public boolean isEventActive() {
        return eventPeriod.isActive();
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
