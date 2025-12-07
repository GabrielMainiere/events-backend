import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { HandleEventChangeUseCase } from '../../application/usecases/handle-event-change.usecase'
import { EventsRepository } from '../events.repository'
import { RegistrationRepository } from 'src/modules/registrations/infraestructure/registration.repository'
import { EventNotificationService } from 'src/modules/notifications/event-notification/event-notification.service'

export const handleEventChangeUseCaseProvider: Provider<HandleEventChangeUseCase> =
  {
    provide: HandleEventChangeUseCase,
    useFactory: (
      eventsRepo: EventsRepository,
      registrationRepo: RegistrationRepository,
      notificationService: EventNotificationService
    ) =>
      new HandleEventChangeUseCase(
        eventsRepo,
        registrationRepo,
        notificationService
      ),
    inject: [EventsRepository, RegistrationRepository, EventNotificationService]
  }

export const useCaseProviders = [handleEventChangeUseCaseProvider]
