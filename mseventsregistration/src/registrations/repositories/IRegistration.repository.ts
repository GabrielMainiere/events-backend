import { Registration } from "../entities/registration.entity";

export interface IRegistrationRepository {
    create(data: {
        userId: string;
        eventId: string;
        status: string;
    }): Promise<Registration>;

    findByUserAndEvent(userId: string, eventId: string): Promise<Registration | null>;

    countByEvent(eventId: string): Promise<number>;
}
