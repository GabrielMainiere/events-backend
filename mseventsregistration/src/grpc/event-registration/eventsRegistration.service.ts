import { IEventNotificationRequest } from "./interfaces/IEventRegistrationRequest";
import { IEventNotificationResponse } from "./interfaces/IEventRegistrationResponse";
import { IEventRegistrationService } from "./interfaces/IEventRegistrationService";
import { EventsRegistrationRepository } from "./eventsRegistration.repository";
import { Injectable } from "@nestjs/common";
import { IGetEventByIdRequest } from "./interfaces/IGetEventByIdRequest";
import { IGetEventByIdResponse } from "./interfaces/IGetEventByIdResponse";

@Injectable()
export class EventsRegistrationService implements IEventRegistrationService {
    constructor(private readonly repository : EventsRegistrationRepository) {}

    async notifyEventCreated(data: IEventNotificationRequest): Promise<IEventNotificationResponse> {
        return this.handleUpsert(data, 'CREATED');
    }

    async notifyEventUpdated(data: IEventNotificationRequest): Promise<IEventNotificationResponse> {
        return this.handleUpsert(data, 'UPDATED');
    }

    async notifyEventCancelled(data: IEventNotificationRequest): Promise<IEventNotificationResponse> {
        return this.handleUpsert(data, 'CANCELLED');
    }

    async getEventById(data: IGetEventByIdRequest): Promise<IGetEventByIdResponse> {
        if (!data.id) throw new Error('eventId must be provided');

        const event = await this.repository.findById(data.id);
        if (!event) throw new Error('Event not found');

        const totalRegistrations = await this.repository.countRegistrations(event.id);
        const hasVacancy = totalRegistrations < event.capacity;

        return {
        id: event.id,
        title: event.title,
        description: event.description ?? '',
        startAt: event.start_at.toISOString(),
        endAt: event.end_at.toISOString(),
        price: event.price ?? 0,
        saleStartAt: event.sale_start_at?.toISOString() ?? '',
        saleEndAt: event.sale_end_at?.toISOString() ?? '',
        addressStreet: event.address_street,
        addressNumber: event.address_number ?? '',
        addressCity: event.address_city,
        addressState: event.address_state,
        addressZipcode: event.address_zipcode,
        addressCountry: event.address_country,
        capacity: event.capacity,
        isFree: event.is_free,
        eventType: event.event_type,
        status: event.status,
        createdAt: event.created_at.toISOString(),
        updatedAt: event.updated_at.toISOString(),
        hasVacancy,
        };
    }

    private async handleUpsert(data: IEventNotificationRequest, action: string) {
        try {
            await this.repository.upsertEvent(data);
            return { success: true, message: `Event ${action} successfully`}
        } catch (error) {
            return { success: false, message: `Failed to ${action} event: ${error.message}`}
        }
    }
}