import { Injectable } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';

@Injectable()
export class EventsService {
  create(createEventInput: CreateEventInput) {
    return 'This action adds a new event';
  }

  findAll() {
    return `This action returns all events`;
  }
}
