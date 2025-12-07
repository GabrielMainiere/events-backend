import { UserDomain } from './user.entity'

export interface IUserRepository {
  findById(id: string): Promise<UserDomain | null>
  upsertUser(user: UserDomain): Promise<UserDomain>
}
