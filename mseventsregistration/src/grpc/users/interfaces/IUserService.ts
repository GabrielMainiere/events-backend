import { Observable } from 'rxjs';
import { IUser } from './IUser';
import { IFindOneUserRequest } from './IFindOneUserRequest';
import { IAuthenticatedUser } from './IAuthenticatedUser';
import { IAuthenticateRequest } from './IAuthenticateRequest';

export interface IUsersService {
  FindOne(request: IFindOneUserRequest): Observable<IUser>;
  Authenticate(request: IAuthenticateRequest): Observable<IAuthenticatedUser>;
}