import { tb_registered_event, tb_user } from "@prisma/client";
import { Registration } from "../entities/registration.entity";

export interface IRegistrationRepository {
    createRegistration(data: {
        userId: string;
        eventId: string;
        status: string;
    }): Promise<Registration>;

    createUser(user: tb_user): Promise<tb_user>;

    findByUserAndEvent(userId: string, eventId: string): Promise<Registration | null>;

    countByEvent(eventId: string): Promise<number>;
    
    findEventById(eventId: string): Promise<tb_registered_event | null>;

    findRegistrationById(registrationId: string): Promise<Registration | null>;

    updateRegistrationStatus(registrationId: string, status: string): Promise<Registration>;

    findAllConfirmedUsersByEvent(eventId: string): Promise<{ event: tb_registered_event; users: tb_user[] }>;
}
