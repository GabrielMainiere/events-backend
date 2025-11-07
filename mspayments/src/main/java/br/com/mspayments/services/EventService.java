package br.com.mspayments.services;

import br.com.mspayments.controllers.dtos.EventData;
import br.com.mspayments.models.Event;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface EventService {
    Event createOrUpdateEvent(EventData eventData, String eventId);

}
