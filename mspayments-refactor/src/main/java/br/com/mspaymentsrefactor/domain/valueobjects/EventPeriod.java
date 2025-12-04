package br.com.mspaymentsrefactor.domain.valueobjects;

import java.time.Instant;
import java.util.Objects;

/**
 * Value Object que representa o período de realização do evento
 */
public class EventPeriod {
    private final Instant startAt;
    private final Instant endAt;

    public EventPeriod(Instant startAt, Instant endAt) {
        if (startAt == null || endAt == null) {
            throw new IllegalArgumentException("Event start and end dates cannot be null");
        }
        if (startAt.isAfter(endAt)) {
            throw new IllegalArgumentException("Event start date must be before end date");
        }
        this.startAt = startAt;
        this.endAt = endAt;
    }

    public Instant getStartAt() {
        return startAt;
    }

    public Instant getEndAt() {
        return endAt;
    }

    public boolean isActive() {
        Instant now = Instant.now();
        return !now.isBefore(startAt) && !now.isAfter(endAt);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EventPeriod that = (EventPeriod) o;
        return Objects.equals(startAt, that.startAt) &&
               Objects.equals(endAt, that.endAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(startAt, endAt);
    }

    @Override
    public String toString() {
        return String.format("EventPeriod[start=%s, end=%s]", startAt, endAt);
    }
}

