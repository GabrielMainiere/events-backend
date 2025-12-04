import { tb_registered_event } from "@prisma/client";

export interface IRegistrationValidator {
    validate(userId: string, event: tb_registered_event): Promise<void>;
}