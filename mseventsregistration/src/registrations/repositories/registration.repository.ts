import { Injectable } from '@nestjs/common';
import { PrismaSingleton } from 'src/core/prismaSingleton';
import { IRegistrationRepository } from './IRegistration.repository';
import { Registration } from '../entities/registration.entity';
import { RegistrationStatus, tb_registered_event } from "@prisma/client";
import { RegistrationMapper } from 'src/mappers/registrationMapper';

@Injectable()
export class RegistrationRepository implements IRegistrationRepository {
    private prisma = PrismaSingleton.getInstance();

    async create(data: { userId: string; eventId: string; status: string }): Promise<Registration> {
        const result = await this.prisma.tb_events_registration.create({
        data: {
            user_id: data.userId,
            registered_event_id: data.eventId,
            status: data.status as RegistrationStatus,
        },
        });

        return RegistrationMapper.toEntity(result);
    }

    async findByUserAndEvent(userId: string, eventId: string): Promise<Registration | null> {
        const result = await this.prisma.tb_events_registration.findFirst({
        where: { user_id: userId, registered_event_id: eventId },
        });

        return result ? RegistrationMapper.toEntity(result) : null;
    }

    async countByEvent(eventId: string): Promise<number> {
        return this.prisma.tb_events_registration.count({
        where: { registered_event_id: eventId },
        });
    }

    async findEventById(eventId: string): Promise<tb_registered_event | null> {
        return this.prisma.tb_registered_event.findUnique({ where: { id: eventId } });
    }
}
