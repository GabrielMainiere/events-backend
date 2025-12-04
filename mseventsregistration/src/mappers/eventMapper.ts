import { EventWithUsers } from 'src/modules/registrations/entities/eventWithUsers.entity';
import { tb_registered_event, tb_user } from '@prisma/client';
import { GqlEventStatus, GqlEventType } from 'src/enum/registerEnum';

export class EventMapper {
  static toGraphQL(
    event: tb_registered_event,
    users: tb_user[]
  ): EventWithUsers {
    return {
      event: {
        id: event.id,
        title: event.title,
        description: event.description ?? undefined,
        startAt: event.start_at,
        endAt: event.end_at,
        price: event.price ?? undefined,
        saleStartAt: event.sale_start_at ?? undefined,
        saleEndAt: event.sale_end_at ?? undefined,
        street: event.address_street,
        number: event.address_number ?? undefined,
        city: event.address_city,
        state: event.address_state,
        zipcode: event.address_zipcode,
        country: event.address_country,
        capacity: event.capacity,
        isFree: event.is_free,
        status: event.status as GqlEventStatus,
        eventType: event.event_type as GqlEventType,
        createdAt: event.created_at,
        updatedAt: event.updated_at
      },
      confirmedUsers: users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        cpf: u.cpf,
        phone: u.phone ?? undefined,
        birthDate: u.birthDate ?? undefined,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt
      }))
    };
  }
}
