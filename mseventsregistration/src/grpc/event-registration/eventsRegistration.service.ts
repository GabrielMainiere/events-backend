import { IEventNotificationRequest } from "./interfaces/IEventRegistrationRequest";
import { IEventNotificationResponse } from "./interfaces/IEventRegistrationResponse";
import { IEventRegistrationService } from "./interfaces/IEventRegistrationService";
import { EventsRegistrationRepository } from "./eventsRegistration.repository";
import { Injectable } from "@nestjs/common";

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

    private async handleUpsert(data: IEventNotificationRequest, action: string) {
        try {
            await this.repository.upsertEvent(data);
            return { success: true, message: `Event ${action} successfully`}
        } catch (error) {
            return { success: false, message: `Failed to ${action} event: ${error.message}`}
        }
    }
}