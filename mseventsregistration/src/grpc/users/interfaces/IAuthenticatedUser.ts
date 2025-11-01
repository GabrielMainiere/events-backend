import { IRole } from "./IRole";

export interface IAuthenticatedUser {
  id: string;
  name: string;
  email: string;
  token: string;
  roles: IRole[];
}