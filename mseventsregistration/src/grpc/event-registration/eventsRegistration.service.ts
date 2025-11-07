import { IEventNotificationRequest } from "./interfaces/IEventRegistrationRequest";
import { IEventNotificationResponse } from "./interfaces/IEventRegistrationResponse";
import { IEventRegistrationService } from "./interfaces/IEventRegistrationService";
import { EventsRegistrationRepository } from "./eventsRegistration.repository";
import { Inject, Injectable } from "@nestjs/common";
import { IGetRegistrationRequest } from "./interfaces/IGetRegistrationRequest";
import { IGetRegistrationResponse } from "./interfaces/IGetRegistrationResponse";
import { IPaymentUpdateRequest } from "./interfaces/IPaymentUpdateRequest";
import { IPaymentUpdateResponse } from "./interfaces/IPaymentUpdateResponse";
import { RegistrationStatus } from "@prisma/client";
import { PaymentStatusMapper } from "src/mappers/paymentStatusMapper";
import { EventRegistrationMapper } from "src/mappers/getRegistrationMapper";
import { EventNotificationService } from "../notifications/event-notification.service";
import type { IRegistrationRepository } from "src/registrations/repositories/IRegistration.repository";

@Injectable()
export class EventsRegistrationService implements IEventRegistrationService {
    constructor(
        private readonly repository : EventsRegistrationRepository,
        private readonly eventNotificationService: EventNotificationService,
        @Inject('IRegistrationRepository') private readonly registrationRepo: IRegistrationRepository
    ) {}

    async notifyEventCreated(data: IEventNotificationRequest): Promise<IEventNotificationResponse> {
        return this.handleUpsert(data, 'CREATED');
    }

    async notifyEventUpdated(data: IEventNotificationRequest): Promise<IEventNotificationResponse> {
        return this.handleUpsert(data, 'UPDATED');
    }

    async notifyEventCancelled(data: IEventNotificationRequest): Promise<IEventNotificationResponse> {
        try {
        await this.handleUpsert(data, 'CANCELED');
        await this.notifyUsersAboutCancellation(data.id);

        return { success: true, message: 'Event CANCELED and users notified' };
        } catch (error) {
        return { success: false, message: `Failed to CANCEL event: ${error.message}` };
        }
    }

    async countEventRegistrations(data: { eventId: string }): Promise<{ count: number }> {
        const { eventId } = data;

        if (!eventId) throw new Error('eventId must be provided');

        const count = await this.repository.countRegistrations(eventId);
        return { count };
    }


    async getRegistration(data: IGetRegistrationRequest): Promise<IGetRegistrationResponse> {
        const { userId, eventId } = data;

        if (!userId || !eventId) {
            throw new Error('userId and eventId must be provided');
        }

        const registration = await this.repository.findRegistration(eventId, userId);
        if (!registration) {
            throw new Error('Registration not found');
        }

        if (registration.status !== RegistrationStatus.WAITING_PAYMENT) {
            throw new Error('Registration is not in WAITING_PAYMENT status');
        }

        const event = await this.repository.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        const user = await this.repository.findUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const totalRegistrations = await this.repository.countRegistrations(event.id);
        const hasVacancy = totalRegistrations < event.capacity;

        return EventRegistrationMapper.toGetRegistrationResponse(event, user, hasVacancy);
    }

    async receivePaymentUpdate(data: IPaymentUpdateRequest): Promise<IPaymentUpdateResponse> {
        const { eventId, userId, status } = data;

        const registration = await this.repository.findRegistration(eventId, userId);
        if (!registration) {
            return { success: false, message: 'Registration not found' };
        }

        if (registration.status !== RegistrationStatus.WAITING_PAYMENT) {
            return { success: false, message: 'Registration not in WAITING_PAYMENT status' };
        }

        const paymentStatus = PaymentStatusMapper.map(status);
        const newStatus = paymentStatus === 'ACCEPTED' ? RegistrationStatus.CONFIRMED : RegistrationStatus.CANCELED;

        await this.repository.updateRegistrationStatus(eventId, userId, newStatus);
        
        if (newStatus === RegistrationStatus.CONFIRMED) {
            const user = await this.registrationRepo.findUserById(userId);
            const event = await this.registrationRepo.findEventById(eventId);
            
            if (user && event) {
                await this.eventNotificationService.sendEventRegistrationNotification(user, event);
            }
        }
        
        return {
            success: true,
            message: `Payment ${paymentStatus === 'ACCEPTED' ? 'accepted' : 'rejected'}, registration updated to ${newStatus}`,
        };
    }

    private async handleUpsert(data: IEventNotificationRequest, action: string) {
        try {
        const existing = await this.repository.findById(data.id);
        if (existing) {
            await this.repository.updateEvent(data);
        } else {
            await this.repository.createEventIfNotExists(data);
        }

        return { success: true, message: `Event ${action} successfully` };
        } catch (error) {
        return { success: false, message: `Failed to ${action} event: ${error.message}` };
        }
    }

    private async notifyUsersAboutCancellation(eventId: string): Promise<void> {
        const [event, registrations] = await Promise.all([
            this.repository.findById(eventId),
            this.registrationRepo.findRegistrationsByEventId(eventId),
        ]);

        if (!event) {
            throw new Error(`Event ${eventId} not found for cancellation notification`);
        }

        await Promise.allSettled(
            registrations.map(async (registration) => {
            const user = await this.registrationRepo.findUserById(registration.userId);
            if (user) {
                await this.eventNotificationService.sendEventCancellationNotification(user, event);
            }
        }));
    }
}    