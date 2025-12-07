import { EventDomain } from 'src/modules/events/domain/event.entity'
import { UserDomain } from 'src/modules/users/domain/user.entity'

export class EventWithUsersResponse {
  event: EventDomain

  confirmedUsers: UserDomain[]

  private constructor(event: EventDomain, confirmedUsers: UserDomain[]) {
    this.event = event
    this.confirmedUsers = confirmedUsers
  }

  static create(
    event: EventDomain,
    confirmedUsers: UserDomain[]
  ): EventWithUsersResponse {
    return new EventWithUsersResponse(event, confirmedUsers)
  }
}
