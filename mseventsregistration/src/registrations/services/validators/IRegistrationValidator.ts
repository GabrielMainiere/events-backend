import { tb_registered_event } from "generated/prisma";

export interface IRegistrationValidator {
    validate(userId: string, event: tb_registered_event): Promise<void>;
}