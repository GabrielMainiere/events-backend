package br.com.mspayments.services;

import br.com.mspayments.controllers.dtos.EventData;
import br.com.mspayments.models.Event;
import br.com.mspayments.repositories.EventRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;

    @Override
    public Event createOrUpdateEvent(EventData eventData, String eventId) {
        UUID eventUuid = null;
        try {
            eventUuid = UUID.fromString(eventId);
            var existingEvent = eventRepository.findById(eventUuid);
            if (existingEvent.isPresent()) {
                log.info("Event found by ID: {}", eventId);
                return existingEvent.get();
            }
        } catch (IllegalArgumentException e) {
            log.warn("Invalid UUID format for eventId: {}", eventId);
        }

        // Criar novo evento
        Event event = new Event();
        event.setId(eventUuid);
        event.setTitle(eventData.getTitle());
        event.setDescription(eventData.getDescription());
        event.setStartAt(parseInstant(eventData.getStartAt()));
        event.setEndAt(parseInstant(eventData.getEndAt()));
        event.setPrice(eventData.getPrice());
        event.setSaleStartAt(parseInstant(eventData.getSaleStartAt()));
        event.setSaleEndAt(parseInstant(eventData.getSaleEndAt()));

        Event savedEvent = eventRepository.save(event);
        log.info("New event created with ID: {}", savedEvent.getId());
        return savedEvent;
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
