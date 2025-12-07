import { Observable } from 'rxjs'
import { FindOneUserRequest } from '../../../application/dto/find-one-user.request'
import { FindOneUserResponse } from 'src/modules/users/application/dto/find-one-user.response'

export interface IUsersGrpcService {
  FindOne(request: FindOneUserRequest): Observable<FindOneUserResponse>
}
