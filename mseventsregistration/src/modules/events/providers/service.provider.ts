import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { EventsService } from '../events.service';
import { IEventsService } from '../interfaces/IEventService';

export const EVENTS_SERVICE = 'EventsService';
export const serviceProvider: Provider<IEventsService> = {
  provide: EVENTS_SERVICE,
  useExisting: EventsService
};
