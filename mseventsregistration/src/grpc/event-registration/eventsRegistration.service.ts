import { IEventNotificationRequest } from "./interfaces/IEventRegistrationRequest";
import { IEventNotificationResponse } from "./interfaces/IEventRegistrationResponse";
import { IEventRegistrationService } from "./interfaces/IEventRegistrationService";
import { EventsRegistrationRepository } from "./eventsRegistration.repository";
import { Injectable } from "@nestjs/common";
import { IGetRegistrationRequest } from "./interfaces/IGetRegistrationRequest";
import { IGetRegistrationResponse } from "./interfaces/IGetRegistrationResponse";
import { IPaymentUpdateRequest } from "./interfaces/IPaymentUpdateRequest";
import { IPaymentUpdateResponse } from "./interfaces/IPaymentUpdateResponse";
import { RegistrationStatus } from "@prisma/client";
import { PaymentStatusMapper } from "src/mappers/paymentStatusMapper";

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
            cpf: user.cpf,
        };
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
        return {
            success: true,
            message: `Payment ${paymentStatus === 'ACCEPTED' ? 'accepted' : 'rejected'}, registration updated to ${newStatus}`,
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