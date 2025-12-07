import { forwardRef, Module } from '@nestjs/common'
import { EventNotificationModule } from 'src/modules/notifications/event-notification/event-notification.module'
import { EventsModule } from '../../events/infraestructure/events.module'
import { UsersModule } from '../../users/infraestructure/users.module'
import { domainServiceProvider } from './providers/domain.provider'
import { useCasesProviders } from './providers/usecase.provider'
import { RegistrationResolver } from './graphql/registrations.resolver'
import { RegistrationsController } from './registrations.controller'
import {
  REGISTRATION_REPOSITORY_TOKEN,
  registrationRepositoryProvider
} from './providers/repository.provider'
import { userClientProvider } from './providers/client.provider'

@Module({
  imports: [
    EventNotificationModule,
    forwardRef(() => EventsModule),
    UsersModule,
    EventNotificationModule
  ],
  providers: [
    ...useCasesProviders,
    domainServiceProvider,
    RegistrationResolver,
    registrationRepositoryProvider,
    userClientProvider
  ],
  exports: [REGISTRATION_REPOSITORY_TOKEN],
  controllers: [RegistrationsController]
})
export class RegistrationsModule {}
