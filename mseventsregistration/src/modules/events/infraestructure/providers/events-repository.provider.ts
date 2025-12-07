import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { IEventsRepository } from '../../domain/IEventsRepository'
import { EventsRepository } from '../events.repository'

export const EVENTS_REPOSITORY_TOKEN = 'EventsRepository'
export const eventsRepositoryProvider: Provider<IEventsRepository> = {
  provide: EVENTS_REPOSITORY_TOKEN,
  useExisting: EventsRepository
}
