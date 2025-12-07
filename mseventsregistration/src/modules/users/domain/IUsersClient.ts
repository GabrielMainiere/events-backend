import { UserDomain } from './user.entity'

export interface IUsersClient {
  findOne(userId: string): Promise<UserDomain>
}
