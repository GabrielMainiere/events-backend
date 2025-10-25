import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly service: EventsService) {}

  @Mutation(() => Event)
  async createEvent(
    @Args('input') input: CreateEventInput,
  ): Promise<Event> {
    return this.service.createEvent(input);
  }

  @Query(() => [Event])
  async events(): Promise<Event[]> {
    return this.service.getAllEvents();
  }
}
