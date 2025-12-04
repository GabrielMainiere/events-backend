import { IGetRegistrationResponse } from 'src/modules/registrations/interfaces/IGetRegistrationResponse';
import { tb_registered_event, tb_user } from '@prisma/client';

export class EventRegistrationMapper {
  static toGetRegistrationResponse(
    event: tb_registered_event,
    user: tb_user,
    hasVacancy: boolean
  ): IGetRegistrationResponse {
    return {
      id: event.id,
      title: event.title,
      description: event.description ?? '',
      startAt: event.start_at.toISOString(),
      endAt: event.end_at.toISOString(),
      price: event.price ?? 0,
      saleStartAt: event.sale_start_at?.toISOString() ?? '',
      saleEndAt: event.sale_end_at?.toISOString() ?? '',
      addressStreet: event.address_street,
      addressNumber: event.address_number ?? '',
      addressCity: event.address_city,
      addressState: event.address_state,
      addressZipcode: event.address_zipcode,
      addressCountry: event.address_country,
      capacity: event.capacity,
      isFree: event.is_free,
      eventType: event.event_type,
      status: event.status,
      createdAt: event.created_at.toISOString(),
      updatedAt: event.updated_at.toISOString(),
      hasVacancy,
      name: user.name,
      email: user.email,
      cpf: user.cpf
    };
  }
}
