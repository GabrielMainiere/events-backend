
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateRoleInput {
    name: string;
}

export interface UpdateRoleInput {
    name?: Nullable<string>;
    deletedAt?: Nullable<string>;
}

export interface CreateUserInput {
    email: string;
    name: string;
    birthDatetime: string;
    cpf: string;
    phoneNumber: string;
    password: string;
    roles: string[];
}

export interface UpdateUserInput {
    email?: Nullable<string>;
    name?: Nullable<string>;
    birthDatetime?: Nullable<string>;
    cpf?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    password?: Nullable<string>;
    roles?: Nullable<string[]>;
    deletedAt?: Nullable<string>;
}

export interface Role {
    id: string;
    name: string;
    deletedAt?: Nullable<string>;
}

export interface IQuery {
    listRoles(): Role[] | Promise<Role[]>;
    findRole(id: string): Nullable<Role> | Promise<Nullable<Role>>;
    listUsers(): Nullable<User>[] | Promise<Nullable<User>[]>;
    findUser(id: string): User | Promise<User>;
}

export interface IMutation {
    createRole(createRoleInput: CreateRoleInput): Role | Promise<Role>;
    updateRole(id: string, updateRoleInput: UpdateRoleInput): Role | Promise<Role>;
    deleteRole(id: string): string | Promise<string>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(id: string, updateUserInput: UpdateUserInput): User | Promise<User>;
    deleteUser(id: string): string | Promise<string>;
}

export interface User {
    id: string;
    email: string;
    name: string;
    birthDatetime: string;
    cpf: string;
    phoneNumber: string;
    roles: Role[];
    deletedAt?: Nullable<string>;
}

type Nullable<T> = T | null;
