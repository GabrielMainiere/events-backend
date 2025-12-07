import { Provider } from '@nestjs/common'
import { RegisterUseCase } from '../../application/usecases/register-user.usecase'
import { RegistrationRepository } from '../registration.repository'
import { EventsRepository } from 'src/modules/events/infraestructure/events.repository'
import { EventRegistrationService } from '../../domain/registration.service'
import { CheckinUseCase } from '../../application/usecases/check-in.usecase'
import { GetUsersOnEventUseCase } from '../../application/usecases/registered-users-on-event.usecase'
import { ProcessPaymentUpdateUseCase } from '../../application/usecases/process-payment-update.usecase'
import { UsersRepository } from 'src/modules/users/infraestructure/users.repository'
import { EventNotificationService } from 'src/modules/notifications/event-notification/event-notification.service'
import { GetRegistrationByUserAndEventUseCase } from '../../application/usecases/get-registration-by-user-and-event.usecase'
import { CountRegistrationsUseCase } from '../../application/usecases/count-registrations.usecase'
export const registerUseCaseProvider: Provider<RegisterUseCase> = {
  provide: RegisterUseCase,
  useFactory: (
    registrationRepo: RegistrationRepository,
    service: EventRegistrationService,
    eventRepo: EventsRepository,
    notificationService: EventNotificationService
  ) =>
    new RegisterUseCase(
      registrationRepo,
      service,
      eventRepo,
      notificationService
    ),
  inject: [
    RegistrationRepository,
    EventRegistrationService,
    EventsRepository,
    EventNotificationService
  ]
}

export const checkinUseCaseProvider: Provider<CheckinUseCase> = {
  provide: CheckinUseCase,
  useFactory: (
    registrationRepo: RegistrationRepository,
    service: EventRegistrationService,
    eventRepo: EventsRepository,
    notificationService: EventNotificationService
  ) =>
    new CheckinUseCase(
      registrationRepo,
      service,
      eventRepo,
      notificationService
    ),
  inject: [
    RegistrationRepository,
    EventRegistrationService,
    EventsRepository,
    EventNotificationService
  ]
}

export const getUsersOnEventUseCaseProvider: Provider<GetUsersOnEventUseCase> =
  {
    provide: GetUsersOnEventUseCase,
    useFactory: (registrationRepo: RegistrationRepository) =>
      new GetUsersOnEventUseCase(registrationRepo),
    inject: [RegistrationRepository]
  }

export const processPaymentUpdateUseCaseProvider: Provider<ProcessPaymentUpdateUseCase> =
  {
    provide: ProcessPaymentUpdateUseCase,
    useFactory: (
      registrationRepo: RegistrationRepository,
      service: EventRegistrationService,
      userRepo: UsersRepository,
      eventRepo: EventsRepository,
      notificationService: EventNotificationService
    ) =>
      new ProcessPaymentUpdateUseCase(
        registrationRepo,
        service,
        userRepo,
        eventRepo,
        notificationService
      ),
    inject: [
      RegistrationRepository,
      EventRegistrationService,
      UsersRepository,
      EventsRepository,
      EventNotificationService
    ]
  }

export const getRegistrationByUserAndEventUseCaseProvider: Provider<GetRegistrationByUserAndEventUseCase> =
  {
    provide: GetRegistrationByUserAndEventUseCase,
    useFactory: (registrationRepo: RegistrationRepository) =>
      new GetRegistrationByUserAndEventUseCase(registrationRepo),
    inject: [RegistrationRepository]
  }

export const countRegistrationsUseCaseProvider: Provider<CountRegistrationsUseCase> =
  {
    provide: CountRegistrationsUseCase,
    useFactory: (registrationRepo: RegistrationRepository) =>
      new CountRegistrationsUseCase(registrationRepo),
    inject: [RegistrationRepository]
  }

export const useCasesProviders = [
  registerUseCaseProvider,
  checkinUseCaseProvider,
  getUsersOnEventUseCaseProvider,
  processPaymentUpdateUseCaseProvider,
  getRegistrationByUserAndEventUseCaseProvider,
  countRegistrationsUseCaseProvider
]
