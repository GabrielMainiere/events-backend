package br.com.mspayments.services;

import br.com.mspayments.controllers.dtos.EventData;
import br.com.mspayments.models.Event;
import br.com.mspayments.repositories.EventRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.time.Instant;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public Event createOrUpdateEvent(EventData eventData, String eventId) {
        try {
            UUID eventUuid = UUID.fromString(eventId);

            // Primeiro, verificar se já existe
            var existingEvent = eventRepository.findById(eventUuid);
            if (existingEvent.isPresent()) {
                log.info("Event found by ID: {}", eventId);
                return existingEvent.get();
            }

            Event event = new Event();
            event.setId(eventUuid);
            event.setTitle(eventData.getTitle());
            event.setDescription(eventData.getDescription());
            event.setStartAt(parseInstant(eventData.getStartAt()));
            event.setEndAt(parseInstant(eventData.getEndAt()));
            event.setPrice(eventData.getPrice());
            event.setSaleStartAt(parseInstant(eventData.getSaleStartAt()));
            event.setSaleEndAt(parseInstant(eventData.getSaleEndAt()));

            entityManager.persist(event);
            entityManager.flush();

            log.info("New event created with ID: {}", event.getId());
            return event;

        } catch (IllegalArgumentException e) {
            log.warn("Invalid UUID format for eventId: {}", eventId);
            throw new RuntimeException("Invalid eventId format: " + eventId);
        }
    }

    private Instant parseInstant(String dateTimeString) {
        try {
            return Instant.parse(dateTimeString);
        } catch (Exception e) {
            log.warn("Failed to parse datetime: {}, using current time", dateTimeString);
            return Instant.now();
        }
    }
}
