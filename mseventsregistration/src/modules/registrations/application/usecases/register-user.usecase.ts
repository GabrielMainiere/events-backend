import { IEventsRepository } from 'src/modules/events/domain/IEventsRepository'
import { EventRegistrationService } from '../../domain/registration.service'
import { IRegistrationRepository } from '../../domain/IRegistrationRepository'
import { RegistrationStatusValueObject } from '../../domain/value-objects/registration-status.vo'
import { EventRegistrationDomain } from '../../domain/registrations.entity'
import { EventNotificationService } from 'src/modules/notifications/event-notification/event-notification.service'
import { IUserRepository } from 'src/modules/users/domain/IUserRepository'
import { UserDomain } from 'src/modules/users/domain/user.entity'
import { IUsersClient } from 'src/modules/users/domain/IUsersClient'

export class RegisterUseCase {
  constructor(
    private readonly registrationRepo: IRegistrationRepository,
    private readonly registrationService: EventRegistrationService,
    private readonly eventRepo: IEventsRepository,
    private readonly eventNotificationService: EventNotificationService,
    private readonly usersClient: IUsersClient,
    private readonly usersRepo: IUserRepository
  ) {}

  async execute(
    userId: string,
    eventId: string
  ): Promise<EventRegistrationDomain> {
    await this.upsertUser(userId)

    const [event, currentRegistrationsCount, isUserAlreadyRegistered] =
      await Promise.all([
        this.eventRepo.findById(eventId),
        this.registrationRepo.countByEvent(eventId, [
          RegistrationStatusValueObject.CONFIRMED,
          RegistrationStatusValueObject.WAITING_PAYMENT
        ]),
        this.registrationRepo.findByUserAndEvent(userId, eventId)
      ])

    if (!event) throw new Error('Event not found.')

    this.registrationService.validateRegistration(
      event,
      currentRegistrationsCount,
      Boolean(isUserAlreadyRegistered)
    )

    const registration = await this.registrationRepo.createRegistration({
      userId,
      eventId,
      status: event.isFree
        ? RegistrationStatusValueObject.CONFIRMED
        : RegistrationStatusValueObject.WAITING_PAYMENT
    })

    if (registration.status === RegistrationStatusValueObject.CONFIRMED) {
      await this.eventNotificationService.sendEventRegistrationNotification(
        registration.user,
        event
      )
      return registration
    }

    await this.eventNotificationService.sendWaitingPaymentNotification(
      registration.user,
      event
    )
    return registration
  }

  private async upsertUser(userId: string): Promise<void> {
    let user: UserDomain | null = null

    try {
      user = await this.usersClient.findOne(userId)
    } catch (err) {
      throw new Error(
        `Error fetching user from msusers: ${(err as Error).message}`
      )
    }

    if (!user) {
      throw new Error('User not found')
    }

    await this.usersRepo.upsertUser({
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      birthDate: user.birthDate,
      phone: user.phone,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }
}
