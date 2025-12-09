import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Event } from 'src/modules/events/domain/entities/event.entity';
import { CreateEventInput } from 'src/modules/events/application/dto/create-event.input';
import { UpdateEventInput } from 'src/modules/events/application/dto/update-event-input';
import { CancelEventInput } from 'src/modules/events/application/dto/cancel-event.input';
import { RolesEnum } from 'src/core/enum/roles';
import { isPublic, RequiredRole } from 'src/auth/auth.decorators';
import { Inject } from '@nestjs/common';
import type { CancelEventPort } from 'src/modules/events/domain/ports/in/cancelEvent.port';
import type { CreateEventPort } from 'src/modules/events/domain/ports/in/createEvent.port';
import type { FindAllEventsPort } from 'src/modules/events/domain/ports/in/findAllEvents.port';
import type { GetEventByIdPort } from 'src/modules/events/domain/ports/in/getEventById.port';
import type { UpdateEventPort } from 'src/modules/events/domain/ports/in/updateEvent.port';
import { EventModel } from '../models/event-graphql.model';
import { EventMapper } from '../mappers/event.mapper';

@Resolver(() => EventModel)
export class EventsResolver {
  constructor(
    @Inject('ICancelEventPort') private readonly cancelEventPort: CancelEventPort,
    @Inject('ICreateEventPort') private readonly createEventPort: CreateEventPort,
    @Inject('IUpdateEventPort') private readonly updateEventPort: UpdateEventPort,
    @Inject('IFindAllEventsPort') private readonly findAllEventsPort: FindAllEventsPort,
    @Inject('IGetEventByIdPort') private readonly getEventByIdPort: GetEventByIdPort,
  ) {}


  @Mutation(() => EventModel)
  @RequiredRole(RolesEnum.Admin)
  async createEvent(@Args('input') input: CreateEventInput): Promise<EventModel> {
    const event = await this.createEventPort.createEvent(input);
    return EventMapper.toGraphModel(event);
  }

  @Mutation(() => EventModel)
  @RequiredRole(RolesEnum.Admin)
  async updateEvent(@Args('input') input: UpdateEventInput): Promise<EventModel> {
    const event = await this.updateEventPort.updateEvent(input);
    return EventMapper.toGraphModel(event);
  }

  @Mutation(() => EventModel)
  @RequiredRole(RolesEnum.Admin)
  async cancelEvent(
    @Args('input') input: CancelEventInput
  ): Promise<EventModel | undefined> {
    const event = await this.cancelEventPort.cancelEvent(input.id);
    return event ? EventMapper.toGraphModel(event) : undefined;
  }

  @Query(() => EventModel)
  @isPublic()
  async getEventById(@Args('id') id: string): Promise<EventModel> {
    const event = await this.getEventByIdPort.getById(id);
    return EventMapper.toGraphModel(event);
  }

  @Query(() => [EventModel])
  @isPublic()
  async events(): Promise<EventModel[]> {
    const events = await this.findAllEventsPort.getAllEvents();
    return events.map(EventMapper.toGraphModel);
  }
}


