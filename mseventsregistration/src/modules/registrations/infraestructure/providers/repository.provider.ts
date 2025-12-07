import { RegistrationRepository } from '../registration.repository'

export const REGISTRATION_REPOSITORY_TOKEN = 'IRegistrationRepository'
export const registrationRepositoryProvider = {
  provide: REGISTRATION_REPOSITORY_TOKEN,
  useClass: RegistrationRepository
}
