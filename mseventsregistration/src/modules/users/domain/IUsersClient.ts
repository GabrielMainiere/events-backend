import { UserDomain } from '../domain/user.entity'

export interface IUsersClient {
  findOne(userId: string): Promise<UserDomain>
}
