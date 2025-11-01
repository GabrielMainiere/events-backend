import { tb_registered_event } from "@prisma/client";
import { Registration } from '../entities/registration.entity';

export interface IRegistrationStrategy {
    execute(userId: string, event: tb_registered_event): Promise<Registration>;
}
