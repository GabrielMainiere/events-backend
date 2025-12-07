import { Observable } from 'rxjs'
import { UserDomain } from '../../../domain/user.entity'
import { FindOneUserRequest } from '../../../application/dto/find-one-user.request'

export interface IUsersGrpcService {
  FindOne(request: FindOneUserRequest): Observable<UserDomain>
}
