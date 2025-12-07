import { Provider } from '@nestjs/common'
import { RegisterUseCase } from '../../application/usecases/register-user.usecase'
import { EventsRepository } from 'src/modules/events/infraestructure/events.repository'
import { EventRegistrationService } from '../../domain/registration.service'
import { CheckinUseCase } from '../../application/usecases/check-in.usecase'
import { GetUsersOnEventUseCase } from '../../application/usecases/registered-users-on-event.usecase'
import { ProcessPaymentUpdateUseCase } from '../../application/usecases/process-payment-update.usecase'
import { UsersRepository } from 'src/modules/users/infraestructure/users.repository'
import { EventNotificationService } from 'src/modules/notifications/event-notification/event-notification.service'
import { GetRegistrationByUserAndEventUseCase } from '../../application/usecases/get-registration-by-user-and-event.usecase'
import { CountRegistrationsUseCase } from '../../application/usecases/count-registrations.usecase'
import { UsersClient } from 'src/modules/users/infraestructure/grpc/userClient'
import { REGISTRATION_REPOSITORY_TOKEN } from './repository.provider'
import { EVENTS_REPOSITORY_TOKEN } from 'src/modules/events/infraestructure/providers/events-repository.provider'
import { IRegistrationRepository } from '../../domain/IRegistrationRepository'

export const registerUseCaseProvider: Provider<RegisterUseCase> = {
  provide: RegisterUseCase,
  useFactory: (
    registrationRepo: IRegistrationRepository,
    service: EventRegistrationService,
    eventRepo: EventsRepository,
    notificationService: EventNotificationService,
    userClient: UsersClient,
    usersRepo: UsersRepository
  ) =>
    new RegisterUseCase(
      registrationRepo,
      service,
      eventRepo,
      notificationService,
      userClient,
      usersRepo
    ),
  inject: [
    REGISTRATION_REPOSITORY_TOKEN,
    EventRegistrationService,
    EVENTS_REPOSITORY_TOKEN,
    EventNotificationService,
    UsersClient,
    UsersRepository
  ]
}

export const checkinUseCaseProvider: Provider<CheckinUseCase> = {
  provide: CheckinUseCase,
  useFactory: (
    registrationRepo: IRegistrationRepository,
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
    REGISTRATION_REPOSITORY_TOKEN,
    EventRegistrationService,
    EVENTS_REPOSITORY_TOKEN,
    EventNotificationService
  ]
}

export const getUsersOnEventUseCaseProvider: Provider<GetUsersOnEventUseCase> =
  {
    provide: GetUsersOnEventUseCase,
    useFactory: (registrationRepo: IRegistrationRepository) =>
      new GetUsersOnEventUseCase(registrationRepo),
    inject: [REGISTRATION_REPOSITORY_TOKEN]
  }

export const processPaymentUpdateUseCaseProvider: Provider<ProcessPaymentUpdateUseCase> =
  {
    provide: ProcessPaymentUpdateUseCase,
    useFactory: (
      registrationRepo: IRegistrationRepository,
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
      REGISTRATION_REPOSITORY_TOKEN,
      EventRegistrationService,
      UsersRepository,
      EVENTS_REPOSITORY_TOKEN,
      EventNotificationService
    ]
  }

export const getRegistrationByUserAndEventUseCaseProvider: Provider<GetRegistrationByUserAndEventUseCase> =
  {
    provide: GetRegistrationByUserAndEventUseCase,
    useFactory: (registrationRepo: IRegistrationRepository) =>
      new GetRegistrationByUserAndEventUseCase(registrationRepo),
    inject: [REGISTRATION_REPOSITORY_TOKEN]
  }

export const countRegistrationsUseCaseProvider: Provider<CountRegistrationsUseCase> =
  {
    provide: CountRegistrationsUseCase,
    useFactory: (registrationRepo: IRegistrationRepository) =>
      new CountRegistrationsUseCase(registrationRepo),
    inject: [REGISTRATION_REPOSITORY_TOKEN]
  }

export const useCasesProviders = [
  registerUseCaseProvider,
  checkinUseCaseProvider,
  getUsersOnEventUseCaseProvider,
  processPaymentUpdateUseCaseProvider,
  getRegistrationByUserAndEventUseCaseProvider,
  countRegistrationsUseCaseProvider
]
