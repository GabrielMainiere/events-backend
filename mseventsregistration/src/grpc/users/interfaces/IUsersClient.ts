import { IAuthenticatedUser } from "./IAuthenticatedUser";
import { IAuthenticateRequest } from "./IAuthenticateRequest";
import { IUser } from "./IUser";

export interface IUsersClient {
  findOne(userId: string): Promise<IUser>;
  authenticate(payload: IAuthenticateRequest): Promise<IAuthenticatedUser>;
}
