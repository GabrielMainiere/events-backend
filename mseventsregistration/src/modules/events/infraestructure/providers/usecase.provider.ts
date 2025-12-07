import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { HandleEventChangeUseCase } from '../../application/usecases/handle-event-change.usecase'
import { EventNotificationService } from 'src/modules/notifications/event-notification/event-notification.service'
import { REGISTRATION_REPOSITORY_TOKEN } from 'src/modules/registrations/infraestructure/providers/repository.provider'
import { IRegistrationRepository } from 'src/modules/registrations/domain/IRegistrationRepository'
import { IEventsRepository } from '../../domain/IEventsRepository'
import { EVENTS_REPOSITORY_TOKEN } from './events-repository.provider'

export const handleEventChangeUseCaseProvider: Provider<HandleEventChangeUseCase> =
  {
    provide: HandleEventChangeUseCase,
    useFactory: (
      eventsRepo: IEventsRepository,
      registrationRepo: IRegistrationRepository,
      notificationService: EventNotificationService
    ) =>
      new HandleEventChangeUseCase(
        eventsRepo,
        registrationRepo,
        notificationService
      ),
    inject: [
      EVENTS_REPOSITORY_TOKEN,
      REGISTRATION_REPOSITORY_TOKEN,
      EventNotificationService
    ]
  }

export const useCaseProviders = [handleEventChangeUseCaseProvider]
