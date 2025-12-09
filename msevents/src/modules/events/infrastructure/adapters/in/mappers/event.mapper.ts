import { Event } from 'src/modules/events/domain/entities/event.entity';
import { EventModel } from '../models/event-graphql.model';
import { AddressMapper } from './address.mapper';

export class EventMapper {
  static toGraphModel(event: Event): EventModel {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      startAt: event.startAt,
      endAt: event.endAt,
      saleStartAt: event.saleStartAt,
      saleEndAt: event.saleEndAt,
      price: event.price,
      isFree: event.isFree,
      capacity: event.capacity,
      address: AddressMapper.toGraphModel(event.address),
      status: event.status,
      eventType: event.eventType,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  }
}
