import { forwardRef, Module } from '@nestjs/common'
import { UsersClient } from 'src/modules/users/client/userClient'
import { EventNotificationModule } from 'src/modules/notifications/event-notification/event-notification.module'
import { EventsModule } from '../../events/infraestructure/events.module'
import { UsersModule } from '../../users/users.module'
import { domainServiceProvider } from './providers/domain.provider'
import { useCasesProviders } from './providers/usecase.provider'
import { RegistrationResolver } from './graphql/registrations.resolver'
import { RegistrationsController } from './registrations.controller'
import { RegistrationRepository } from './registration.repository'

@Module({
  imports: [
    EventNotificationModule,
    forwardRef(() => EventsModule),
    UsersModule
  ],
  providers: [
    ...useCasesProviders,
    domainServiceProvider,
    RegistrationResolver,
    {
      provide: 'IRegistrationRepository',
      useClass: RegistrationRepository
    },
    RegistrationRepository,
    {
      provide: 'IUsersClient',
      useExisting: UsersClient
    }
  ],
  controllers: [RegistrationsController]
})
export class RegistrationsModule {}
