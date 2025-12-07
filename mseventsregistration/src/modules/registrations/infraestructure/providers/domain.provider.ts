import { Provider } from '@nestjs/common'
import { EventRegistrationService } from '../../domain/registration.service'

export const domainServiceProvider: Provider<EventRegistrationService> = {
  provide: EventRegistrationService,

  useFactory: () => new EventRegistrationService()
}
