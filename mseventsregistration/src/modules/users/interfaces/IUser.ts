import { IRole } from "./IRole";

export interface IUser {
    id: string;
    name: string;
    email: string;
    birthDatetime: string;
    cpf: string;
    phoneNumber: string;
    roles: IRole[];
    deletedAt?: string;
}