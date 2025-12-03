import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { IEventsRepository } from '../interfaces/IEventsRepository';
import { EventsRepository } from '../events.repository';

export const EVENTS_REPOSITORY = 'EventsRepository';
export const repositoryProvider: Provider<IEventsRepository> = {
  provide: EVENTS_REPOSITORY,
  useExisting: EventsRepository
};
